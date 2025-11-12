import { Product } from "@shared/schema";

// Import product images
import chairImage from "@assets/generated_images/Modern_gray_armchair_245a9895.png";
import mugImage from "@assets/generated_images/White_ceramic_mug_ac1fd6a5.png";
import lampImage from "@assets/generated_images/Brass_table_lamp_9fbef4c3.png";
import cuttingBoardImage from "@assets/generated_images/Oak_cutting_board_01457441.png";
import clockImage from "@assets/generated_images/Black_wall_clock_abf66e47.png";
import blanketImage from "@assets/generated_images/Beige_linen_blanket_3615f3a8.png";
import vaseImage from "@assets/generated_images/Gray_ceramic_vase_88bc30b1.png";
import walletImage from "@assets/generated_images/Brown_leather_wallet_5a5c9bbf.png";
import organizerImage from "@assets/generated_images/White_desk_organizer_769a74a5.png";

/**
 * Dummy product data for the e-commerce store
 * In a real application, this would come from a database/API
 */
export const dummyProducts: Omit<Product, "id">[] = [
  {
    name: "Modern Lounge Chair",
    description: "Elegant Scandinavian-inspired armchair with soft gray upholstery. Perfect for reading nooks and living spaces. Features solid wood legs and premium fabric.",
    price: "599.00",
    salePrice: null,
    category: "furniture",
    image: chairImage,
    images: [chairImage],
    stock: 15,
    featured: 1,
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Handcrafted porcelain mug with smooth finish. Ideal for your morning coffee or tea. Dishwasher and microwave safe.",
    price: "24.00",
    salePrice: "19.00",
    category: "kitchen",
    image: mugImage,
    images: [mugImage],
    stock: 50,
    featured: 1,
  },
  {
    name: "Brass Desk Lamp",
    description: "Contemporary table lamp with brass finish and adjustable arm. Provides warm ambient lighting for your workspace or bedside table.",
    price: "129.00",
    salePrice: null,
    category: "lighting",
    image: lampImage,
    images: [lampImage],
    stock: 20,
    featured: 1,
  },
  {
    name: "Oak Cutting Board",
    description: "Premium solid oak cutting board with natural grain. Perfect for food preparation and serving. Treated with food-safe mineral oil.",
    price: "65.00",
    salePrice: null,
    category: "kitchen",
    image: cuttingBoardImage,
    images: [cuttingBoardImage],
    stock: 30,
    featured: 1,
  },
  {
    name: "Minimalist Wall Clock",
    description: "Clean, modern design clock with black metal frame. Silent sweep movement ensures no ticking noise. Battery operated.",
    price: "89.00",
    salePrice: null,
    category: "decor",
    image: clockImage,
    images: [clockImage],
    stock: 25,
    featured: 0,
  },
  {
    name: "Linen Throw Blanket",
    description: "Luxurious natural linen blanket in warm beige. Perfect for layering on beds or sofas. Machine washable and breathable.",
    price: "110.00",
    salePrice: "95.00",
    category: "textiles",
    image: blanketImage,
    images: [blanketImage],
    stock: 40,
    featured: 0,
  },
  {
    name: "Ceramic Vase",
    description: "Sleek cylindrical vase in matte gray finish. Ideal for fresh or dried flowers. Handmade ceramic with contemporary aesthetic.",
    price: "48.00",
    salePrice: null,
    category: "decor",
    image: vaseImage,
    images: [vaseImage],
    stock: 35,
    featured: 0,
  },
  {
    name: "Leather Bifold Wallet",
    description: "Classic slim wallet crafted from premium full-grain leather. Features multiple card slots and bill compartment. Ages beautifully.",
    price: "78.00",
    salePrice: null,
    category: "accessories",
    image: walletImage,
    images: [walletImage],
    stock: 45,
    featured: 0,
  },
  {
    name: "Wire Desk Organizer",
    description: "Modern metal mesh desk caddy with multiple compartments. Keeps your workspace tidy and organized. Powder-coated white finish.",
    price: "32.00",
    salePrice: null,
    category: "accessories",
    image: organizerImage,
    images: [organizerImage],
    stock: 60,
    featured: 0,
  },
];
