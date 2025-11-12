import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, DollarSign } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/**
 * Checkout page with shipping form and payment options
 * Two-column layout: form (60%) and order summary (40%)
 * Payment methods: Credit Card, PayPal, Cash on Delivery
 */

const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zip: z.string().min(4, "ZIP code must be at least 4 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  paymentMethod: z.enum(["card", "paypal", "cod"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { cart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartTotal = getCartTotal();
  const shipping = cartTotal > 50 ? 0 : 10;
  const finalTotal = cartTotal + shipping;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  // Redirect if cart is empty
  if (cart.length === 0) {
    setLocation("/cart");
    return null;
  }

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return await apiRequest("POST", "/api/orders", orderData);
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);

    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;

      // Prepare order data
      const orderData = {
        orderNumber,
        customerName: data.name,
        customerEmail: data.email,
        customerAddress: data.address,
        customerCity: data.city,
        customerZip: data.zip,
        customerCountry: data.country,
        paymentMethod: data.paymentMethod,
        subtotal: cartTotal.toString(),
        shipping: shipping.toString(),
        total: finalTotal.toString(),
        status: "processing",
        items: cart.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          price: item.price.toString(),
          quantity: item.quantity,
        })),
      };

      // Create order in backend
      await createOrderMutation.mutateAsync(orderData);

      // Clear cart
      clearCart();

      toast({
        title: "Order placed successfully!",
        description: `Your order number is ${orderNumber}`,
      });

      setIsProcessing(false);

      // Redirect to invoice
      setLocation(`/invoice/${orderNumber}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1
            data-testid="text-page-title"
            className="text-3xl sm:text-4xl font-medium mb-2"
          >
            Checkout
          </h1>
          <p className="text-base text-muted-foreground">
            Complete your purchase
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: Checkout Form (60% / 3 columns) */}
              <div className="lg:col-span-3 space-y-8">
                {/* Shipping Information */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Shipping Information
                  </h2>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-name"
                              placeholder="John Doe"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-email"
                              type="email"
                              placeholder="john@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-address"
                              placeholder="123 Main Street"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testid="input-city"
                                placeholder="New York"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testid="input-zip"
                                placeholder="10001"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-country"
                              placeholder="United States"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-3"
                          >
                            {/* Credit Card */}
                            <div
                              data-testid="payment-option-card"
                              className={`flex items-center space-x-3 p-4 rounded-md border-2 transition-colors cursor-pointer hover-elevate ${
                                paymentMethod === "card"
                                  ? "border-primary bg-primary/5"
                                  : "border-border"
                              }`}
                              onClick={() => form.setValue("paymentMethod", "card")}
                            >
                              <RadioGroupItem value="card" id="card" />
                              <Label
                                htmlFor="card"
                                className="flex items-center gap-2 cursor-pointer flex-1"
                              >
                                <CreditCard className="h-5 w-5" />
                                <span className="font-medium">Credit / Debit Card</span>
                              </Label>
                            </div>

                            {/* PayPal */}
                            <div
                              data-testid="payment-option-paypal"
                              className={`flex items-center space-x-3 p-4 rounded-md border-2 transition-colors cursor-pointer hover-elevate ${
                                paymentMethod === "paypal"
                                  ? "border-primary bg-primary/5"
                                  : "border-border"
                              }`}
                              onClick={() => form.setValue("paymentMethod", "paypal")}
                            >
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label
                                htmlFor="paypal"
                                className="flex items-center gap-2 cursor-pointer flex-1"
                              >
                                <SiPaypal className="h-5 w-5" />
                                <span className="font-medium">PayPal</span>
                              </Label>
                            </div>

                            {/* Cash on Delivery */}
                            <div
                              data-testid="payment-option-cod"
                              className={`flex items-center space-x-3 p-4 rounded-md border-2 transition-colors cursor-pointer hover-elevate ${
                                paymentMethod === "cod"
                                  ? "border-primary bg-primary/5"
                                  : "border-border"
                              }`}
                              onClick={() => form.setValue("paymentMethod", "cod")}
                            >
                              <RadioGroupItem value="cod" id="cod" />
                              <Label
                                htmlFor="cod"
                                className="flex items-center gap-2 cursor-pointer flex-1"
                              >
                                <DollarSign className="h-5 w-5" />
                                <span className="font-medium">Cash on Delivery</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Card Details (only show if card is selected) */}
                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testid="input-card-number"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  data-testid="input-card-expiry"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardCvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  data-testid="input-card-cvc"
                                  placeholder="123"
                                  maxLength={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Right: Order Summary (40% / 2 columns) */}
              <div className="lg:col-span-2">
                <Card className="p-6 sticky top-20">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.productId}
                        data-testid={`order-item-${item.productId}`}
                        className="flex gap-3"
                      >
                        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">
                            {item.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Totals */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span data-testid="text-summary-subtotal">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Shipping</span>
                      <span data-testid="text-summary-shipping">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-semibold mb-6">
                    <span>Total</span>
                    <span data-testid="text-summary-total">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    data-testid="button-place-order"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
