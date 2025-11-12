import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

/**
 * Main navigation bar component
 * Sticky header with logo, navigation links, search, and cart
 * Responsive with mobile hamburger menu
 */
export function Navbar() {
  const [location] = useLocation();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-semibold tracking-tight hover-elevate active-elevate-2 cursor-pointer px-2 py-1 rounded-md">
              MINIMAL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  data-testid={`link-${link.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer ${
                    location === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button - desktop */}
            <Button
              variant="ghost"
              size="icon"
              data-testid="button-search"
              className="hidden md:flex"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart button */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-cart"
                className="relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    data-testid="badge-cart-count"
                    className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center text-xs px-1"
                    variant="default"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              data-testid="button-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    className={`block px-4 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 cursor-pointer ${
                      location === link.href
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <button
                data-testid="button-mobile-search"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover-elevate active-elevate-2 rounded-md"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
