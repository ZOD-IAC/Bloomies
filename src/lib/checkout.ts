import { productReference, productLink } from "./product-reference.ts";
import type { CartItem, Product } from "@/types/product";
export function checkoutMessage(items: CartItem[], products: Product[]) {
  let total = 0;
  const lines = items.map((item) => {
    const p = products.find((p) => p.id === item.productId);
    if (!p) return "";
    total += p.price * item.quantity;
    return `${p.name}${p.imageKind === "ai" ? " (AI concept — final design to confirm)" : ""} × ${item.quantity} | ${item.variant}${item.personalization ? ` | Note: ${item.personalization}` : ""} | ₹${p.price * item.quantity}\nProduct ID: ${productReference(p)}\nProduct link: ${productLink(p)}`;
  });
  return `Hi Bloomies by Aadar! I'd like to inquire about:\n\n${lines.join("\n\n")}\n\nEstimated sample total: ₹${total}\nThis is an inquiry, not a completed purchase. Please confirm actual pricing, availability, customization and delivery.`;
}
export function whatsappUrl(number: string, message: string) {
  if (!/^[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
