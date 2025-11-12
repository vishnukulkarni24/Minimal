import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { Product, Category } from "@shared/schema";
import heroImage from "@assets/generated_images/Hero_lifestyle_home_image_6919f284.png";

/**
 * Homepage component
 * Features: Hero section, featured products carousel, and category showcase
 */
export default function HomePage() {
  // Fetch products from API
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Fetch categories from API
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Get featured products (featured = 1)
  const featuredProducts = products?.filter((p) => p.featured === 1).slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section - 50-60vh height */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {/* Hero Image */}
        <img
          src={heroImage}
          alt="Modern minimalist home interior"
          data-testid="img-hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark gradient wash for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <h1
              data-testid="text-hero-title"
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight"
            >
              Minimal Living
            </h1>
            <p
              data-testid="text-hero-subtitle"
              className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Curated essentials for modern spaces
            </p>
            <Link href="/products">
              <Button
                data-testid="button-shop-now"
                size="lg"
                className="backdrop-blur-md bg-white/90 text-foreground hover:bg-white px-8 py-6 text-base font-medium"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              data-testid="text-featured-title"
              className="text-3xl sm:text-4xl font-medium mb-4"
            >
              Featured Products
            </h2>
            <p
              data-testid="text-featured-subtitle"
              className="text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Discover our hand-picked selection of premium essentials
            </p>
          </div>

          {/* Product Grid - 4 columns on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {productsLoading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  salePrice={product.salePrice}
                  image={product.image}
                  description={product.description}
                />
              ))
            )}
          </div>

          {/* View All Products Link */}
          <div className="text-center">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                data-testid="button-view-all-products"
                className="px-8"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              data-testid="text-categories-title"
              className="text-3xl sm:text-4xl font-medium mb-4"
            >
              Shop by Category
            </h2>
            <p
              data-testid="text-categories-subtitle"
              className="text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Explore our carefully curated collections
            </p>
          </div>

          {/* Category Grid - 6 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categoriesLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-md" />
              ))
            ) : (
              categories?.map((category) => (
                <CategoryCard
                  key={category.slug}
                  slug={category.slug}
                  name={category.name}
                  image={category.image}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
