import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItemComponent } from "@/components/CartItemComponent";

/**
 * Shopping cart page
 * Single column layout with cart items and sticky summary sidebar
 * Shows empty state when cart is empty
 */
export default function CartPage() {
  const { cart, getCartTotal, getCartCount } = useCart();
  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const shipping = cartTotal > 50 ? 0 : 10;
  const finalTotal = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1
            data-testid="text-empty-cart-title"
            className="text-2xl font-medium mb-4"
          >
            Your cart is empty
          </h1>
          <p
            data-testid="text-empty-cart-message"
            className="text-base text-muted-foreground mb-8"
          >
            Add some products to get started
          </p>
          <Link href="/products">
            <Button size="lg" data-testid="button-start-shopping">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1
            data-testid="text-page-title"
            className="text-3xl sm:text-4xl font-medium mb-2"
          >
            Shopping Cart
          </h1>
          <p
            data-testid="text-cart-count"
            className="text-base text-muted-foreground"
          >
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItemComponent key={item.productId} item={item} />
            ))}
          </div>

          {/* Order Summary - Sticky on desktop */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2
                data-testid="text-summary-title"
                className="text-xl font-semibold mb-6"
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal" className="font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span data-testid="text-shipping" className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && cartTotal < 50 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span data-testid="text-total">${finalTotal.toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <Button
                  data-testid="button-checkout"
                  size="lg"
                  className="w-full gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  variant="ghost"
                  data-testid="button-continue-shopping"
                  className="w-full mt-3"
                >
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
