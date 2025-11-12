import { Link } from "wouter";
import { Card } from "@/components/ui/card";

/**
 * Category card component for displaying categories
 * Square image with category name overlay
 */
interface CategoryCardProps {
  slug: string;
  name: string;
  image: string;
}

export function CategoryCard({ slug, name, image }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${slug}`}>
      <Card
        data-testid={`card-category-${slug}`}
        className="group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        {/* Category Image - 1:1 aspect ratio */}
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img
            src={image}
            alt={name}
            data-testid={`img-category-${slug}`}
            className="w-full h-full object-cover"
          />
          
          {/* Category Name Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-4">
            <h3
              data-testid={`text-category-name-${slug}`}
              className="text-white font-semibold text-lg"
            >
              {name}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
