"use client";
// Client component — GSAP and useRef require the browser environment

import { useEffect, useRef } from "react";
// useEffect: start the GSAP ticker after the DOM is painted
// useRef: hold the track element without triggering re-renders

import Image from "next/image";
// next/image for optimised, lazy-loaded remote images

import gsap from "gsap";
// GreenSock — drives the infinite horizontal ticker

import styles from "./ProductCarousel.module.css";
// Scoped CSS module — all layout and card styles live here

// ---------------------------------------------------------------------------
// Product data — 6 backpack listings with Pexels images.
// Duplicate this array in the JSX to create the seamless loop.
// ---------------------------------------------------------------------------
const PRODUCTS = [
  {
    id: 1,
    name: "Alpine Trail Pack",
    price: 89.99,
    // Pexels photo 2905238 — hiker with large backpack
    image:
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Urban Commuter",
    price: 64.99,
    // Pexels photo 1152077 — clean black backpack
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Summit Series 30L",
    price: 119.99,
    // Pexels photo 3278215 — grey technical backpack
    image:
      "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Daybreak Sling",
    price: 49.99,
    // Pexels photo 1545998 — person wearing backpack outdoors
    image:
      "https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Explorer 45L",
    price: 134.99,
    // Pexels photo 3731256 — backpack on mountain trail
    image:
      "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Campus Classic",
    price: 54.99,
    // Pexels photo 1262304 — casual backpack
    image:
      "https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function ProductCarousel() {
  // Ref on the inner moving track — GSAP animates its x position
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // The track renders PRODUCTS twice. Half the scrollWidth = one full set.
    // Animating x from 0 to -half and repeating creates a seamless infinite loop:
    //   at x = 0          → first copy of cards is in view
    //   at x = -halfWidth → second (identical) copy is in view
    //   GSAP snaps back to 0 → visually undetectable because both positions look the same
    const halfWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      // Slide the track left by exactly one full set of cards
      x: -halfWidth,
      // Slower = more relaxed browsing feel
      duration: 32,
      // Constant speed — no easing
      ease: "none",
      // Repeat forever
      repeat: -1,
    });

    // Clean up on unmount
    return () => { tween.kill(); };
  }, []);

  // Render the product list twice side-by-side inside the track.
  // The second copy is what makes the loop invisible to the viewer.
  const doubled = [...PRODUCTS, ...PRODUCTS];

  return (
    // Outer section — sits below the hero on the page
    <section className={styles.section}>

      {/* Viewport clips the overflowing track to the section width */}
      <div className={styles.viewport}>

        {/* Moving track — GSAP translates this element on the x axis */}
        <div ref={trackRef} className={styles.track}>

          {doubled.map((product, index) => (
            // Individual product card
            <div key={index} className={styles.card}>

              {/* Product image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  // Cover the wrapper without distorting the image
                  style={{ objectFit: "cover" }}
                  // These are decorative cards — don't need priority loading
                  priority={false}
                />
              </div>

              {/* Card body — name, price, actions */}
              <div className={styles.cardBody}>

                {/* Name + price on one compact row */}
                <div className={styles.namePriceRow}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.price}>${product.price.toFixed(2)}</p>
                </div>

                {/* Action buttons */}
                <div className={styles.actions}>
                  <button className={styles.btnBuy}>Buy Now</button>
                  <button className={styles.btnView}>View</button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}
