import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { FilterPanel } from "@/components/FilterPanel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

/**
 * Products listing page with filtering functionality
 * Features: search, category filter, price range filter
 * Responsive: sidebar filters on desktop, drawer on mobile
 */
export default function ProductsPage() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch products from API
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Parse URL query params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategories([category]);
    }
  }, [location]);

  // Filter products based on current filters
  const filteredProducts = (products || []).filter((product) => {
    // Search filter
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    // Price filter
    const productPrice = parseFloat(product.salePrice || product.price);
    const matchesPrice =
      productPrice >= priceRange[0] && productPrice <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1
            data-testid="text-page-title"
            className="text-3xl sm:text-4xl font-medium mb-2"
          >
            All Products
          </h1>
          <p
            data-testid="text-products-count"
            className="text-base text-muted-foreground"
          >
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterPanel
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    data-testid="button-mobile-filters"
                    className="w-full sm:w-auto gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <div className="py-4">
                    <FilterPanel
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      selectedCategories={selectedCategories}
                      onCategoryToggle={handleCategoryToggle}
                      priceRange={priceRange}
                      onPriceRangeChange={setPriceRange}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    image={product.image}
                    description={product.description}
                  />
                ))}
              </div>
            ) : (
              <div
                data-testid="text-no-products"
                className="text-center py-16"
              >
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your filters
                </p>
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  data-testid="button-clear-filters-empty"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
