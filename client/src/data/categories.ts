import { Category } from "@shared/schema";

// Import category images
import furnitureImage from "@assets/generated_images/Furniture_category_8b84f9ed.png";
import kitchenImage from "@assets/generated_images/Kitchen_category_e892f3ee.png";
import lightingImage from "@assets/generated_images/Lighting_category_26ea200c.png";
import decorImage from "@assets/generated_images/Decor_category_8c95bbae.png";
import textilesImage from "@assets/generated_images/Textiles_category_6144795d.png";
import accessoriesImage from "@assets/generated_images/Accessories_category_47bf6b42.png";

/**
 * Dummy category data for the e-commerce store
 * In a real application, this would come from a database/API
 */
export const dummyCategories: Omit<Category, "id">[] = [
  {
    name: "Furniture",
    slug: "furniture",
    image: furnitureImage,
    description: "Modern and minimalist furniture pieces for every room",
  },
  {
    name: "Kitchen",
    slug: "kitchen",
    image: kitchenImage,
    description: "Essential kitchenware and dining accessories",
  },
  {
    name: "Lighting",
    slug: "lighting",
    image: lightingImage,
    description: "Contemporary lamps and lighting fixtures",
  },
  {
    name: "Decor",
    slug: "decor",
    image: decorImage,
    description: "Stylish home decor and decorative objects",
  },
  {
    name: "Textiles",
    slug: "textiles",
    image: textilesImage,
    description: "Quality linens, blankets, and soft furnishings",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: accessoriesImage,
    description: "Everyday essentials and organizational tools",
  },
];
