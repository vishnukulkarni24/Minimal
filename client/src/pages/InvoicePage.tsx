import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Printer, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

/**
 * Invoice page displaying order confirmation
 * Centered document layout with order details
 * Features: order number, date, customer info, line items, totals, print button
 */
export default function InvoicePage() {
  const [, params] = useRoute("/invoice/:orderNumber");
  const orderNumber = params?.orderNumber || "";

  // Fetch order from API
  const { data: orderData, isLoading } = useQuery({
    queryKey: [`/api/orders/${orderNumber}`],
    enabled: !!orderNumber,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <Card className="p-8 sm:p-12">
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-medium mb-4">Order not found</h1>
          <p className="text-base text-muted-foreground mb-8">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const orderDate = format(new Date(orderData.createdAt), "MMMM dd, yyyy 'at' hh:mm a");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - hide on print */}
        <div className="mb-6 print:hidden">
          <Link href="/">
            <Button variant="ghost" data-testid="button-back" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="p-8 sm:p-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1
                data-testid="text-page-title"
                className="text-3xl sm:text-4xl font-medium mb-2"
              >
                Order Confirmation
              </h1>
              <p className="text-sm text-muted-foreground">
                Thank you for your purchase!
              </p>
            </div>
            <Button
              onClick={handlePrint}
              variant="outline"
              data-testid="button-print"
              className="gap-2 print:hidden"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>

          <Separator className="my-8" />

          {/* Order Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3">
                Order Details
              </h2>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground mb-1">Order Number</dt>
                  <dd
                    data-testid="text-order-number"
                    className="font-medium text-base"
                  >
                    {orderData.orderNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Date</dt>
                  <dd data-testid="text-order-date" className="font-medium">
                    {orderDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Status</dt>
                  <dd>
                    <Badge variant="default" data-testid="badge-status">
                      Processing
                    </Badge>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-3">
                Customer Information
              </h2>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground mb-1">Name</dt>
                  <dd data-testid="text-customer-name" className="font-medium">
                    {orderData.customerName}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Email</dt>
                  <dd data-testid="text-customer-email" className="font-medium">
                    {orderData.customerEmail}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Shipping Address</dt>
                  <dd
                    data-testid="text-customer-address"
                    className="font-medium"
                  >
                    {orderData.customerAddress}
                    <br />
                    {orderData.customerCity}, {orderData.customerZip}
                    <br />
                    {orderData.customerCountry}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Payment Method</dt>
                  <dd data-testid="text-payment-method" className="font-medium capitalize">
                    {orderData.paymentMethod === "card"
                      ? "Credit Card"
                      : orderData.paymentMethod === "paypal"
                      ? "PayPal"
                      : "Cash on Delivery"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">
              Order Items
            </h2>

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y">
              {orderData.items.map((item: any) => (
                <div
                  key={item.productId}
                  data-testid={`invoice-item-${item.productId}`}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-4"
                >
                  {/* Product */}
                  <div className="sm:col-span-6 flex items-center gap-3">
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        data-testid={`text-item-name-${item.productId}`}
                        className="font-medium"
                      >
                        {item.productName}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="sm:col-span-2 flex sm:justify-end items-center">
                    <span className="text-sm sm:hidden text-muted-foreground mr-2">
                      Price:
                    </span>
                    <span data-testid={`text-item-price-${item.productId}`}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-2 flex sm:justify-end items-center">
                    <span className="text-sm sm:hidden text-muted-foreground mr-2">
                      Quantity:
                    </span>
                    <span data-testid={`text-item-quantity-${item.productId}`}>
                      {item.quantity}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="sm:col-span-2 flex sm:justify-end items-center font-medium">
                    <span className="text-sm sm:hidden text-muted-foreground mr-2">
                      Total:
                    </span>
                    <span data-testid={`text-item-total-${item.productId}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Order Summary */}
          <div className="flex justify-end">
            <div className="w-full sm:w-80 space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span data-testid="text-invoice-subtotal" className="font-medium">
                  ${orderData.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Shipping</span>
                <span data-testid="text-invoice-shipping" className="font-medium">
                  {orderData.shipping === 0
                    ? "Free"
                    : `$${orderData.shipping.toFixed(2)}`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span data-testid="text-invoice-total">
                  ${orderData.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to{" "}
              <span className="font-medium">{orderData.customerEmail}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              If you have any questions, please contact our customer service.
            </p>
          </div>
        </Card>

        {/* Continue Shopping Button - hide on print */}
        <div className="mt-8 text-center print:hidden">
          <Link href="/products">
            <Button size="lg" data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
