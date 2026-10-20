"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, ShoppingBag, Sun, X } from "lucide-react";
import { categories } from "@/data/products";
import { useCart } from "./cart-provider";
export function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const trigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const { items } = useCart();

  useEffect(() => {
    if (!open) return;
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        (window.matchMedia("(max-width: 700px)").matches
          ? mobileTrigger.current
          : trigger.current
        )?.focus();
      }
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  function theme() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("bloomies-theme", next ? "dark" : "light");
    } catch {}
  }
  return (
    <>
      <div className="announcement">
        Little things. Big feelings.{" "}
        <span>Handcrafted gifting, with a personal touch.</span>
      </div>
      <header>
        <div className="nav-shell">
          <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
            bloomies<span>BY AADAR</span>
          </Link>
          <nav aria-label="Main navigation">
            <button
              ref={trigger}
              aria-expanded={open}
              aria-controls="collection-menu"
              onClick={() => setOpen(!open)}
            >
              Explore gifts <span className={open ? "rotate" : ""}>+</span>
            </button>
            <Link href="/shop">Shop all</Link>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Let’s talk</Link>
          </nav>
          <div className="nav-actions">
            <button aria-label="Toggle colour theme" onClick={theme}>
              <Sun size={19} />
            </button>
            <Link
              href="/cart"
              aria-label={`Cart with ${items.reduce((n, x) => n + x.quantity, 0)} items`}
            >
              <ShoppingBag size={20} />
              <sup>{items.reduce((n, x) => n + x.quantity, 0)}</sup>
            </Link>
            <button
              ref={mobileTrigger}
              className="mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="collection-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              id="collection-menu"
              className="mega-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduce ? 0 : 0.28 }}
            >
              <div className="mega-inner">
                <div>
                  <p className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</p>
                  <h2>
                    Find their kind
                    <br />
                    <em>of happy.</em>
                  </h2>
                  <Link href="/shop" onClick={() => setOpen(false)}>
                    Explore all gifts <ArrowUpRight size={18} />
                  </Link>
                </div>
                <div className="mega-links">
                  {categories.map((c, i) => (
                    <Link
                      key={c}
                      href={`/collections/${c.toLowerCase().replaceAll(" ", "-")}`}
                      onClick={() => setOpen(false)}
                    >
                      <span>0{i + 1}</span>
                      {c}
                      <ArrowUpRight size={18} />
                    </Link>
                  ))}
                  <Link href="/about" onClick={() => setOpen(false)}>
                    Our story
                  </Link>
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {open && (
        <button
          className="menu-backdrop"
          tabIndex={-1}
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
