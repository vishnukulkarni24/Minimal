import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

/**
 * Product card component for displaying product in grid
 * Shows image, name, price, and add to cart button
 * Includes hover effects and sale price display
 */
interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  salePrice?: string | null;
  image: string;
  description: string;
}

export function ProductCard({
  id,
  name,
  price,
  salePrice,
  image,
  description,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const displayPrice = salePrice || price;
  const hasDiscount = !!salePrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: id,
      productName: name,
      productImage: image,
      price: parseFloat(displayPrice),
    });

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/product/${id}`}>
      <Card
        data-testid={`card-product-${id}`}
        className="group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      >
        {/* Product Image - 3:4 aspect ratio */}
        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
          <img
            src={image}
            alt={name}
            data-testid={`img-product-${id}`}
            className="w-full h-full object-cover"
          />
          
          {/* Quick add to cart button - visible on hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              onClick={handleAddToCart}
              data-testid={`button-quick-add-${id}`}
              className="w-full backdrop-blur-md bg-background/90 hover:bg-background text-foreground gap-2"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name - truncate to 2 lines */}
          <h3
            data-testid={`text-product-name-${id}`}
            className="font-medium text-lg mb-1 line-clamp-2 min-h-[3.5rem]"
          >
            {name}
          </h3>

          {/* Description - truncate to 2 lines */}
          <p
            data-testid={`text-product-description-${id}`}
            className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]"
          >
            {description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span
              data-testid={`text-product-price-${id}`}
              className="text-lg font-semibold"
            >
              ${displayPrice}
            </span>
            {hasDiscount && (
              <span
                data-testid={`text-product-original-price-${id}`}
                className="text-sm text-muted-foreground line-through"
              >
                ${price}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
