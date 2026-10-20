"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types/product";
import { categories } from "@/data/products";
import { ProductCard } from "./product-card";
export function Shop({
  products,
  initialCategory = "All",
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [max, setMax] = useState("");
  const shown = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "All" || p.category === category) &&
            `${p.name} ${p.description} ${p.category}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (!max || p.price <= Number(max)),
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : sort === "name"
                ? a.name.localeCompare(b.name)
                : 0,
        ),
    [products, query, category, sort, max],
  );
  return (
    <>
      <div className="shop-tools">
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Search gifts"
            placeholder="Find a little happiness…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Maximum sample price</span>
          <input
            type="number"
            min="0"
            placeholder="Max price ₹"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Sort gifts</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
      <div className="filter-row">
        <SlidersHorizontal size={17} />
        {["All", ...categories].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            className={category === c ? "active" : ""}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="results-line">
        {shown.length} little reasons to smile{" "}
        <span>Illustrative catalog · prices and availability unconfirmed</span>
      </div>
      {shown.length ? (
        <div className="product-grid">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No gifts found.</h2>
          <p>Try another search or clear your filters.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setMax("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
