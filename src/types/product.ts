export type Category =
  | "Flowers"
  | "Chocolate"
  | "Skincare"
  | "Soft toys"
  | "Gift boxes"
  | "Personalized";
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  availability: "sample" | "available" | "unavailable" | "on-request";
  images: string[];
  imageKind?: "reference" | "illustration" | "ai";
  imagePosition?: string;
  variants: string[];
  personalization: boolean;
  color: string;
};
export type CartItem = {
  productId: string;
  variant: string;
  personalization: string;
  quantity: number;
};
