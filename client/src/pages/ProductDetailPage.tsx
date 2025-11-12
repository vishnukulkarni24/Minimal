import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Product detail page
 * Two-column layout: image gallery (60%) and product info (40%)
 * Features: quantity selector, add to cart, specs accordion
 */
export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const productId = params?.id || "";

  // Fetch product from API
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <Skeleton className="aspect-[4/5] w-full mb-4" />
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      price: parseFloat(displayPrice),
      quantity,
    });

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/products">
          <Button
            variant="ghost"
            data-testid="button-back"
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Image Gallery (60% / 3 columns) */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="aspect-[4/5] bg-muted rounded-md overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                data-testid="img-product-main"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover-elevate active-elevate-2 border-2 border-primary"
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    data-testid={`img-thumbnail-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info (40% / 2 columns) */}
          <div className="lg:col-span-2">
            {/* Product Name */}
            <h1
              data-testid="text-product-name"
              className="text-3xl sm:text-4xl font-medium mb-4"
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                data-testid="text-product-price"
                className="text-3xl font-semibold"
              >
                ${displayPrice}
              </span>
              {hasDiscount && (
                <>
                  <span
                    data-testid="text-original-price"
                    className="text-xl text-muted-foreground line-through"
                  >
                    ${product.price}
                  </span>
                  <Badge variant="destructive" data-testid="badge-sale">
                    Sale
                  </Badge>
                </>
              )}
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-2">
                Description
              </h2>
              <p
                data-testid="text-product-description"
                className="text-base text-muted-foreground leading-relaxed"
              >
                {product.description}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Stock Status */}
            <div className="mb-6">
              <Badge
                variant={product.stock > 0 ? "default" : "destructive"}
                data-testid="badge-stock-status"
              >
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </Badge>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <Label htmlFor="quantity" className="text-sm font-medium mb-2 block">
                Quantity
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-decrease-quantity"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  data-testid="input-quantity"
                  className="w-20 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
              size="lg"
              className="w-full gap-2 mb-6"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>

            <Separator className="my-6" />

            {/* Product Specs Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger data-testid="accordion-details">
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Category:</dt>
                      <dd className="font-medium capitalize">{product.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Stock:</dt>
                      <dd className="font-medium">{product.stock} units</dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger data-testid="accordion-shipping">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Free standard shipping on orders over $50. Express shipping
                  available. 30-day return policy for unused items in original
                  packaging.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care">
                <AccordionTrigger data-testid="accordion-care">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Please refer to the care label for specific instructions.
                  Generally, handle with care and clean according to material type.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
