import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@shared/schema";

/**
 * Cart Context for managing shopping cart state across the application
 * Uses Context API with local storage persistence
 */

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider component that wraps the app and provides cart functionality
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Add item to cart or increment quantity if already exists
   */
  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.productId === item.productId);
      
      if (existingItem) {
        // Item already in cart - increment quantity
        return prevCart.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        // New item - add to cart
        return [...prevCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  /**
   * Remove item from cart completely
   */
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  /**
   * Update quantity of specific item
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Calculate total price of all items in cart
   */
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Get total number of items in cart
   */
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to use cart context
 * Must be used within CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
