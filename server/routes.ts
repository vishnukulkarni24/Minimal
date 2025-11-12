import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertCategorySchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";

/**
 * Register all API routes
 * All routes are prefixed with /api
 * Validates request bodies using Zod schemas
 */
export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============================================================================
  // PRODUCT ROUTES
  // ============================================================================

  /**
   * GET /api/products
   * Get all products
   * Query params: category (optional) - filter by category
   */
  app.get("/api/products", async (req, res) => {
    try {
      let products = await storage.getAllProducts();

      // Filter by category if provided
      const category = req.query.category as string | undefined;
      if (category) {
        products = products.filter((p) => p.category === category);
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  /**
   * GET /api/products/:id
   * Get single product by ID
   */
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  /**
   * POST /api/products
   * Create new product
   */
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Error creating product:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  /**
   * PUT /api/products/:id
   * Update existing product
   */
  app.put("/api/products/:id", async (req, res) => {
    try {
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error: any) {
      console.error("Error updating product:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  /**
   * DELETE /api/products/:id
   * Delete product
   */
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // ============================================================================
  // CATEGORY ROUTES
  // ============================================================================

  /**
   * GET /api/categories
   * Get all categories
   */
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  /**
   * GET /api/categories/:slug
   * Get category by slug
   */
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  /**
   * POST /api/categories
   * Create new category
   */
  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error: any) {
      console.error("Error creating category:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid category data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  // ============================================================================
  // ORDER ROUTES
  // ============================================================================

  /**
   * POST /api/orders
   * Create new order with order items
   * Request body should include order details and items array
   */
  app.post("/api/orders", async (req, res) => {
    try {
      const { items, ...orderData } = req.body;

      // Validate order data
      const validatedOrder = insertOrderSchema.parse(orderData);

      // Create order
      const order = await storage.createOrder(validatedOrder);

      // Create order items if provided
      if (items && Array.isArray(items)) {
        for (const item of items) {
          const validatedItem = insertOrderItemSchema.parse({
            ...item,
            orderId: order.id,
          });
          await storage.createOrderItem(validatedItem);
        }
      }

      res.status(201).json(order);
    } catch (error: any) {
      console.error("Error creating order:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid order data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  /**
   * GET /api/orders/:orderNumber
   * Get order by order number
   */
  app.get("/api/orders/:orderNumber", async (req, res) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Get order items
      const items = await storage.getOrderItemsByOrderId(order.id);

      res.json({ ...order, items });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  /**
   * GET /api/orders/:orderId/items
   * Get all items for an order
   */
  app.get("/api/orders/:orderId/items", async (req, res) => {
    try {
      const items = await storage.getOrderItemsByOrderId(req.params.orderId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching order items:", error);
      res.status(500).json({ error: "Failed to fetch order items" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
