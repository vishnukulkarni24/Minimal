import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

/**
 * Footer component with links, newsletter signup, and social media
 * Multi-column responsive layout
 */
export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for exclusive offers and new arrivals.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                data-testid="input-newsletter-email"
                className="h-10"
              />
              <Button data-testid="button-subscribe" className="h-10">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Cart
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Returns
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  FAQ
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 MINIMAL. All rights reserved.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-social-facebook"
                className="h-8 w-8"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-social-instagram"
                className="h-8 w-8"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-social-twitter"
                className="h-8 w-8"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Visa
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Mastercard
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                PayPal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
