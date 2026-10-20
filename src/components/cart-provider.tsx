"use client";
import { createContext, useContext, useSyncExternalStore } from "react";
import type { CartItem } from "@/types/product";
type State = {
  items: CartItem[];
  ready: boolean;
  add: (item: CartItem) => void;
  quantity: (index: number, n: number) => void;
  remove: (index: number) => void;
};
const Context = createContext<State | null>(null);
const empty: CartItem[] = [];
let rawCache: string | null = null;
let itemCache: CartItem[] = empty;
const key = "bloomies-cart-v1";
function snapshot() {
  try {
    const raw = localStorage.getItem(key);
    if (raw === rawCache) return itemCache;
    rawCache = raw;
    const data: unknown = JSON.parse(raw || "[]");
    itemCache = Array.isArray(data)
      ? data.filter(
          (x): x is CartItem =>
            !!x &&
            typeof x.productId === "string" &&
            typeof x.variant === "string" &&
            typeof x.personalization === "string" &&
            Number.isInteger(x.quantity) &&
            x.quantity > 0 &&
            x.quantity <= 99,
        )
      : empty;
    return itemCache;
  } catch {
    return itemCache;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("bloomies-cart", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bloomies-cart", callback);
  };
}
function write(items: CartItem[]) {
  itemCache = items;
  rawCache = JSON.stringify(items);
  try {
    localStorage.setItem(key, rawCache);
  } catch {}
  window.dispatchEvent(new Event("bloomies-cart"));
}
const subscribeReady = () => () => {};
export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, snapshot, () => empty);
  const ready = useSyncExternalStore(
    subscribeReady,
    () => true,
    () => false,
  );
  function add(item: CartItem) {
    const old = snapshot();
    const i = old.findIndex(
      (x) =>
        x.productId === item.productId &&
        x.variant === item.variant &&
        x.personalization === item.personalization,
    );
    write(
      i < 0
        ? [...old, item]
        : old.map((x, n) =>
            n === i
              ? { ...x, quantity: Math.min(99, x.quantity + item.quantity) }
              : x,
          ),
    );
  }
  return (
    <Context.Provider
      value={{
        items,
        ready,
        add,
        quantity: (i, n) =>
          write(
            snapshot().map((x, j) =>
              j === i ? { ...x, quantity: Math.min(99, Math.max(1, n)) } : x,
            ),
          ),
        remove: (i) => write(snapshot().filter((_, j) => i !== j)),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useCart() {
  const state = useContext(Context);
  if (!state) throw new Error("CartProvider missing");
  return state;
}
