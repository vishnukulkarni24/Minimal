import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
} from "@shared/schema";
import { randomUUID } from "crypto";

/**
 * Storage interface defining all CRUD operations
 * Provides methods for products, categories, orders, and order items
 */
export interface IStorage {
  // User methods (existing)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  getOrderById(id: string): Promise<Order | undefined>;

  // Order item methods
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]>;
}

/**
 * In-memory storage implementation
 * Stores all data in memory using Maps
 * Data is lost on server restart
 */
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private categories: Map<string, Category>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
  }

  // ============================================================================
  // USER METHODS
  // ============================================================================

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // ============================================================================
  // PRODUCT METHODS
  // ============================================================================

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(
    id: string,
    productUpdate: Partial<InsertProduct>
  ): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;

    const updated: Product = { ...existing, ...productUpdate };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // ============================================================================
  // CATEGORY METHODS
  // ============================================================================

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find((cat) => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // ============================================================================
  // ORDER METHODS
  // ============================================================================

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.orderNumber === orderNumber
    );
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  // ============================================================================
  // ORDER ITEM METHODS
  // ============================================================================

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId
    );
  }
}

export const storage = new MemStorage();
