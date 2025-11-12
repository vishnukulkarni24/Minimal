import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { dummyCategories } from "@/data/categories";

/**
 * Filter panel component for product filtering
 * Includes search, category filters, and price range
 * Responsive: sidebar on desktop, drawer on mobile
 */
interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
}: FilterPanelProps) {
  const hasActiveFilters =
    searchQuery !== "" || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="w-full">
      {/* Search */}
      <div className="mb-6">
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">
          Search Products
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            data-testid="input-search"
            className="pl-9 h-10"
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Categories */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Categories</Label>
        <div className="space-y-3">
          {dummyCategories.map((category) => {
            const isSelected = selectedCategories.includes(category.slug);
            return (
              <div key={category.slug} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category.slug}`}
                  checked={isSelected}
                  onCheckedChange={() => onCategoryToggle(category.slug)}
                  data-testid={`checkbox-category-${category.slug}`}
                />
                <Label
                  htmlFor={`category-${category.slug}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {category.name}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            min={0}
            max={1000}
            step={10}
            data-testid="slider-price-range"
            className="mb-4"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])
                }
                data-testid="input-price-min"
                className="h-9 text-sm"
                min={0}
                max={priceRange[1]}
              />
              <span className="text-xs text-muted-foreground mt-1 block">Min</span>
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="flex-1">
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000])
                }
                data-testid="input-price-max"
                className="h-9 text-sm"
                min={priceRange[0]}
                max={1000}
              />
              <span className="text-xs text-muted-foreground mt-1 block">Max</span>
            </div>
          </div>
        </div>
      </div>

      {/* Applied Filters */}
      {hasActiveFilters && (
        <>
          <Separator className="my-6" />
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Active Filters</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                data-testid="button-clear-filters"
                className="h-auto p-0 text-xs hover:underline"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge
                  variant="secondary"
                  data-testid="badge-filter-search"
                  className="gap-1"
                >
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => onSearchChange("")}
                  />
                </Badge>
              )}
              {selectedCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  data-testid={`badge-filter-category-${cat}`}
                  className="gap-1"
                >
                  {dummyCategories.find((c) => c.slug === cat)?.name}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => onCategoryToggle(cat)}
                  />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge
                  variant="secondary"
                  data-testid="badge-filter-price"
                  className="gap-1"
                >
                  ${priceRange[0]} - ${priceRange[1]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => onPriceRangeChange([0, 1000])}
                  />
                </Badge>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
