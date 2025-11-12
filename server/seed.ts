import { storage } from "./storage";
import type { InsertProduct, InsertCategory } from "@shared/schema";

/**
 * Seed the database with initial dummy data
 * This function populates products and categories when the server starts
 */
export async function seedDatabase() {
  console.log("Seeding database with dummy data...");

  // Check if data already exists
  const existingProducts = await storage.getAllProducts();
  if (existingProducts.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  // Seed Categories
  const categories: InsertCategory[] = [
    {
      name: "Furniture",
      slug: "furniture",
      image: "/assets/generated_images/Furniture_category_8b84f9ed.png",
      description: "Modern and minimalist furniture pieces for every room",
    },
    {
      name: "Kitchen",
      slug: "kitchen",
      image: "/assets/generated_images/Kitchen_category_e892f3ee.png",
      description: "Essential kitchenware and dining accessories",
    },
    {
      name: "Lighting",
      slug: "lighting",
      image: "/assets/generated_images/Lighting_category_26ea200c.png",
      description: "Contemporary lamps and lighting fixtures",
    },
    {
      name: "Decor",
      slug: "decor",
      image: "/assets/generated_images/Decor_category_8c95bbae.png",
      description: "Stylish home decor and decorative objects",
    },
    {
      name: "Textiles",
      slug: "textiles",
      image: "/assets/generated_images/Textiles_category_6144795d.png",
      description: "Quality linens, blankets, and soft furnishings",
    },
    {
      name: "Accessories",
      slug: "accessories",
      image: "/assets/generated_images/Accessories_category_47bf6b42.png",
      description: "Everyday essentials and organizational tools",
    },
  ];

  for (const category of categories) {
    await storage.createCategory(category);
  }

  console.log(`✓ Created ${categories.length} categories`);

  // Seed Products
  const products: InsertProduct[] = [
    {
      name: "Modern Lounge Chair",
      description: "Elegant Scandinavian-inspired armchair with soft gray upholstery. Perfect for reading nooks and living spaces. Features solid wood legs and premium fabric.",
      price: "599.00",
      salePrice: null,
      category: "furniture",
      image: "/assets/generated_images/Modern_gray_armchair_245a9895.png",
      images: ["/assets/generated_images/Modern_gray_armchair_245a9895.png"],
      stock: 15,
      featured: 1,
    },
    {
      name: "Ceramic Coffee Mug",
      description: "Handcrafted porcelain mug with smooth finish. Ideal for your morning coffee or tea. Dishwasher and microwave safe.",
      price: "24.00",
      salePrice: "19.00",
      category: "kitchen",
      image: "/assets/generated_images/White_ceramic_mug_ac1fd6a5.png",
      images: ["/assets/generated_images/White_ceramic_mug_ac1fd6a5.png"],
      stock: 50,
      featured: 1,
    },
    {
      name: "Brass Desk Lamp",
      description: "Contemporary table lamp with brass finish and adjustable arm. Provides warm ambient lighting for your workspace or bedside table.",
      price: "129.00",
      salePrice: null,
      category: "lighting",
      image: "/assets/generated_images/Brass_table_lamp_9fbef4c3.png",
      images: ["/assets/generated_images/Brass_table_lamp_9fbef4c3.png"],
      stock: 20,
      featured: 1,
    },
    {
      name: "Oak Cutting Board",
      description: "Premium solid oak cutting board with natural grain. Perfect for food preparation and serving. Treated with food-safe mineral oil.",
      price: "65.00",
      salePrice: null,
      category: "kitchen",
      image: "/assets/generated_images/Oak_cutting_board_01457441.png",
      images: ["/assets/generated_images/Oak_cutting_board_01457441.png"],
      stock: 30,
      featured: 1,
    },
    {
      name: "Minimalist Wall Clock",
      description: "Clean, modern design clock with black metal frame. Silent sweep movement ensures no ticking noise. Battery operated.",
      price: "89.00",
      salePrice: null,
      category: "decor",
      image: "/assets/generated_images/Black_wall_clock_abf66e47.png",
      images: ["/assets/generated_images/Black_wall_clock_abf66e47.png"],
      stock: 25,
      featured: 0,
    },
    {
      name: "Linen Throw Blanket",
      description: "Luxurious natural linen blanket in warm beige. Perfect for layering on beds or sofas. Machine washable and breathable.",
      price: "110.00",
      salePrice: "95.00",
      category: "textiles",
      image: "/assets/generated_images/Beige_linen_blanket_3615f3a8.png",
      images: ["/assets/generated_images/Beige_linen_blanket_3615f3a8.png"],
      stock: 40,
      featured: 0,
    },
    {
      name: "Ceramic Vase",
      description: "Sleek cylindrical vase in matte gray finish. Ideal for fresh or dried flowers. Handmade ceramic with contemporary aesthetic.",
      price: "48.00",
      salePrice: null,
      category: "decor",
      image: "/assets/generated_images/Gray_ceramic_vase_88bc30b1.png",
      images: ["/assets/generated_images/Gray_ceramic_vase_88bc30b1.png"],
      stock: 35,
      featured: 0,
    },
    {
      name: "Leather Bifold Wallet",
      description: "Classic slim wallet crafted from premium full-grain leather. Features multiple card slots and bill compartment. Ages beautifully.",
      price: "78.00",
      salePrice: null,
      category: "accessories",
      image: "/assets/generated_images/Brown_leather_wallet_5a5c9bbf.png",
      images: ["/assets/generated_images/Brown_leather_wallet_5a5c9bbf.png"],
      stock: 45,
      featured: 0,
    },
    {
      name: "Wire Desk Organizer",
      description: "Modern metal mesh desk caddy with multiple compartments. Keeps your workspace tidy and organized. Powder-coated white finish.",
      price: "32.00",
      salePrice: null,
      category: "accessories",
      image: "/assets/generated_images/White_desk_organizer_769a74a5.png",
      images: ["/assets/generated_images/White_desk_organizer_769a74a5.png"],
      stock: 60,
      featured: 0,
    },
  ];

  for (const product of products) {
    await storage.createProduct(product);
  }

  console.log(`✓ Created ${products.length} products`);
  console.log("Database seeding completed!");
}
