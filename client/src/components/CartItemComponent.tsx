import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@shared/schema";

/**
 * Cart item component for displaying individual items in cart
 * Shows thumbnail, product details, quantity controls, and remove button
 * Responsive: horizontal layout on desktop, stacked on mobile
 */
interface CartItemComponentProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.productId, newQuantity);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div
      data-testid={`cart-item-${item.productId}`}
      className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-md hover-elevate"
    >
      {/* Product Image - 100px square */}
      <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
        <img
          src={item.productImage}
          alt={item.productName}
          data-testid={`img-cart-item-${item.productId}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3
          data-testid={`text-cart-item-name-${item.productId}`}
          className="font-medium text-base mb-1 line-clamp-1"
        >
          {item.productName}
        </h3>
        <p
          data-testid={`text-cart-item-price-${item.productId}`}
          className="text-sm text-muted-foreground mb-2"
        >
          ${item.price.toFixed(2)} each
        </p>

        {/* Quantity Controls - Mobile */}
        <div className="flex items-center gap-2 sm:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            data-testid={`button-decrease-${item.productId}`}
            className="h-8 w-8"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            data-testid={`input-quantity-${item.productId}`}
            className="h-8 w-16 text-center"
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            data-testid={`button-increase-${item.productId}`}
            className="h-8 w-8"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Quantity Controls - Desktop */}
      <div className="hidden sm:flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          data-testid={`button-decrease-desktop-${item.productId}`}
          className="h-9 w-9"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          data-testid={`input-quantity-desktop-${item.productId}`}
          className="h-9 w-16 text-center"
          min="1"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          data-testid={`button-increase-desktop-${item.productId}`}
          className="h-9 w-9"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Item Total & Remove */}
      <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-2 sm:gap-4">
        <p
          data-testid={`text-cart-item-total-${item.productId}`}
          className="font-semibold text-lg"
        >
          ${itemTotal.toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.productId)}
          data-testid={`button-remove-${item.productId}`}
          className="h-9 w-9 text-destructive hover:text-destructive"
          aria-label="Remove item"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
