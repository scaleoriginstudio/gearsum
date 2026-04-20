"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Category = "bags" | "uniforms" | "recyclables";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// ---------------------------------------------------------------------------
// Product data per category — Pexels images
// ---------------------------------------------------------------------------
const PRODUCTS: Record<Category, Product[]> = {
  bags: [
    {
      id: 1,
      name: "Alpine Trail Pack",
      price: 89.99,
      image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Urban Commuter",
      price: 64.99,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Summit Series 30L",
      price: 119.99,
      image: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Daybreak Sling",
      price: 49.99,
      image: "https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Explorer 45L",
      price: 134.99,
      image: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      name: "Campus Classic",
      price: 54.99,
      image: "https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 7,
      name: "Leather Tote",
      price: 74.99,
      image: "https://images.pexels.com/photos/1204459/pexels-photo-1204459.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 8,
      name: "Weekend Duffle",
      price: 94.99,
      image: "https://images.pexels.com/photos/5625008/pexels-photo-5625008.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  uniforms: [
    {
      id: 1,
      name: "Classic Polo",
      price: 44.99,
      image: "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Sport Performance Tee",
      price: 34.99,
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Event Staff Shirt",
      price: 54.99,
      image: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Team Jersey",
      price: 59.99,
      image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Casual Branded Tee",
      price: 29.99,
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      name: "Work Uniform Top",
      price: 49.99,
      image: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 7,
      name: "Athletic Hoodie",
      price: 74.99,
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 8,
      name: "Dry-Fit Training Top",
      price: 39.99,
      image: "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  recyclables: [
    {
      id: 1,
      name: "Ceramic Mug 350ml",
      price: 24.99,
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Travel Tumbler",
      price: 34.99,
      image: "https://images.pexels.com/photos/1793034/pexels-photo-1793034.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Eco Cup Set",
      price: 29.99,
      image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Branded Mug XL",
      price: 19.99,
      image: "https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Stainless Flask",
      price: 44.99,
      image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      name: "Reusable Coffee Cup",
      price: 22.99,
      image: "https://images.pexels.com/photos/3020291/pexels-photo-3020291.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 7,
      name: "Glass Water Bottle",
      price: 27.99,
      image: "https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 8,
      name: "Bamboo Mug",
      price: 32.99,
      image: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
};

// ---------------------------------------------------------------------------
// Category config — icon path, label, accent colour
// ---------------------------------------------------------------------------
const CATEGORIES: { id: Category; icon: string; label: string; color: string }[] = [
  { id: "bags",        icon: "/img/bagicon.svg",    label: "Bags",        color: "#4a90d9" },
  { id: "uniforms",    icon: "/img/shirticon.svg",  label: "Uniforms",    color: "#9d92c8" },
  { id: "recyclables", icon: "/img/mugicon.svg",    label: "Recyclables", color: "#37b9ac" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function ShopPage() {
  const [active, setActive] = useState<Category>("bags");
  const products = PRODUCTS[active];

  return (
    <main className={styles.page}>

      {/* ------------------------------------------------------------------ */}
      {/* Category tabs                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {CATEGORIES.map(({ id, icon, label, color }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                style={isActive ? ({ "--accent": color } as React.CSSProperties) : undefined}
                onClick={() => setActive(id)}
                aria-pressed={isActive}
              >
                <Image
                  src={icon}
                  alt=""
                  width={20}
                  height={20}
                  className={`${styles.tabIcon} ${isActive ? styles.tabIconActive : ""}`}
                />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Product grid                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>

            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <button className={styles.btnBuy}>Buy Now</button>
            </div>

          </article>
        ))}
      </section>

    </main>
  );
}
