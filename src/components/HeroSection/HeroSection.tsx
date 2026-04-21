"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GearSumLogoSVG from "./GearSumLogoSVG";
import styles from "./HeroSection.module.css";

const MIN_SCALE   = 0.12;
const MAX_SCALE   = 0.62;
const MIN_OPACITY = 0.04;
const MAX_OPACITY = 0.50;

const SCROLL_SCALE_DELTA   = 0.25;
const SCROLL_OPACITY_DELTA = 0.12;

const SENSITIVITY = 0.0008;

const LOGO_ORIGIN = "44% 44%";

const CARDS = [
  {
    img: "/img/gear1.webp",
    label: "Turbo 4 Anti Theft Faux Leather\nwith Raincover – Black-Black",
    url: "https://www.shopmygear.com/collections/turbo",
    pos: { top: "8%", left: "8%" }, origin: "top left",      progress: 0.7,
    move: { x: 700, y: 600 },
  },
  {
    img: "/img/gear2.jpg",
    label: "Turbo 4 Anti Theft Faux Leather\nwith Raincover – Grey-Black",
    url: "https://www.shopmygear.com/products/turbo-4-anti-theft-faux-leather-with-raincover-19-40l-black-brown-copy",
    pos: { top: "10%", left: "26%" }, origin: "top left",    progress: 0.3,
    move: { x: 450, y: 500 },
  },
  {
    img: "/img/gear3.jpg",
    label: "Turbo 4 Anti Theft Faux Leather\nwith Raincover – Black-Brown",
    url: "https://www.shopmygear.com/products/gear-quantum-3-antitheft-faux-leather-with-raincover-29l-brown-black-copy",
    pos: { top: "10%", right: "26%" }, origin: "top right",  progress: 0.5,
    move: { x: -450, y: 500 },
  },
  {
    img: "/img/gear4.webp",
    label: "Aspire Faux Leather Laptop\nBackpack 17 – Black-Black",
    url: "https://www.shopmygear.com/products/quantum-3-antitheft-faux-leather-with-raincove-laptop-backpack-black-black-copy",
    pos: { top: "8%", right: "8%" }, origin: "top right",    progress: 0.15,
    move: { x: -700, y: 600 },
  },
  {
    img: "/img/gear5.webp",
    label: "Aspire 3 Faux Leather\n– Brown-Brown",
    url: "https://www.shopmygear.com/products/gear-aspire-32l-brown-brown",
    pos: { top: "40%", left: "8%" }, origin: "center left",  progress: 0.45,
    move: { x: 700, y: 40 },
  },
  {
    img: "/img/gear6.webp",
    label: "Elite Faux Leather Sling\n– Black-Black",
    url: "https://www.shopmygear.com/collections/crossbody/products/elite-faux-leather-sling-4l-brown-brown-copy",
    pos: { top: "40%", right: "8%" }, origin: "center right", progress: 0.85,
    move: { x: -700, y: -40 },
  },
  {
    img: "/img/gear7.webp",
    label: "Vintage 2 Anti Theft Faux Leather\n– Pitch Black-Black",
    url: "https://www.shopmygear.com/products/gear-explore-2-47l-blue-yellow-copy",
    pos: { bottom: "8%", left: "8%" }, origin: "bottom left", progress: 0.55,
    move: { x: 700, y: -600 },
  },
  {
    img: "/img/gear8.webp",
    label: "Cross Training Faux Leather\nDuffel – Black-Black",
    url: "https://www.shopmygear.com/products/aspire-faux-leather-laptop-backpack-17-black-black-copy",
    pos: { bottom: "10%", left: "26%" }, origin: "bottom left", progress: 0.2,
    move: { x: 450, y: -500 },
  },
  {
    img: "/img/gear9.webp",
    label: "Vault Faux Leather Laptop\nBackpack – Black",
    url: "https://www.shopmygear.com/products/vault-faux-leather-laptop-backpack-30l-tan-copy",
    pos: { bottom: "10%", right: "26%" }, origin: "bottom right", progress: 0.65,
    move: { x: -450, y: -500 },
  },
  {
    img: "/img/gear10.webp",
    label: "Heritage Faux Leather Laptop\nBackpack – Black",
    url: "https://www.shopmygear.com/products/heritage-faux-leather-laptop-backpack-30l-brown-copy",
    pos: { bottom: "8%", right: "8%" }, origin: "bottom right", progress: 0.4,
    move: { x: -700, y: -600 },
  },
];

export default function HeroSection() {
  const cardRefs      = useRef<(HTMLAnchorElement | null)[]>([]);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const logoRef       = useRef<HTMLDivElement>(null);
  const sectionRef    = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // Background colour sweeps to purple
    const sectionEl = sectionRef.current;
    if (sectionEl) {
      tl.fromTo(sectionEl, { backgroundColor: "#040307" }, { backgroundColor: "#9d92c8" }, 0);
    }

    // SVG logo zooms in with S as anchor
    const logoEl = logoRef.current;
    if (logoEl) {
      gsap.set(logoEl, { transformOrigin: LOGO_ORIGIN });
      tl.fromTo(logoEl, { scale: 1, opacity: 1 }, { scale: 120, opacity: 0, duration: 0.5 }, 0);
    }

    // Cards zoom + fly inward
    CARDS.forEach((card, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      const baseScale   = MIN_SCALE + card.progress * (MAX_SCALE - MIN_SCALE);
      const baseOpacity = MIN_OPACITY + card.progress * (MAX_OPACITY - MIN_OPACITY);

      gsap.set(el, { transformOrigin: card.origin });

      tl.fromTo(
        el,
        { scale: baseScale, opacity: baseOpacity, x: 0, y: 0 },
        {
          scale:   baseScale + SCROLL_SCALE_DELTA,
          opacity: baseOpacity + SCROLL_OPACITY_DELTA,
          x: card.move.x,
          y: card.move.y,
        },
        0
      );
    });

    let animProgress  = 0;
    let transitioned  = false;
    let scheduled     = false;

    function transitionToSection2() {
      if (transitioned) return;
      transitioned = true;

      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);

      const main = document.querySelector("main");
      if (main) {
        gsap.to(main, { y: -window.innerHeight, duration: 0.9, ease: "power2.inOut" });
      }
    }

    function applyProgress(newProgress: number) {
      animProgress = Math.min(1, Math.max(0, newProgress));

      gsap.to(tl, { progress: animProgress, duration: 0.6, ease: "power2.out", overwrite: true });

      if (cardsLayerRef.current) {
        cardsLayerRef.current.style.pointerEvents = animProgress >= 0.99 ? "none" : "";
      }

      window.dispatchEvent(
        new CustomEvent("heroProgress", { detail: { progress: animProgress } })
      );

      // Once animation is at 100%, auto-transition after the tween settles
      if (animProgress >= 1 && !scheduled) {
        scheduled = true;
        gsap.delayedCall(0.65, transitionToSection2);
      }
    }

    function onWheel(e: WheelEvent) {
      if (animProgress >= 1) return;
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      if (e.deltaMode === 2) delta *= 600;

      applyProgress(animProgress + delta * SENSITIVITY);
    }

    let touchStartY = 0;

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;

      if (animProgress >= 1) return;
      e.preventDefault();
      applyProgress(animProgress + delta * SENSITIVITY * 5);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      tl.kill();
    };
  }, []);

  return (
    <section id="section-1" ref={sectionRef} className={styles.hero}>

      {/* Product cards */}
      <div ref={cardsLayerRef}>
        {CARDS.map((card, i) => {
          const baseScale   = MIN_SCALE + card.progress * (MAX_SCALE - MIN_SCALE);
          const baseOpacity = MIN_OPACITY + card.progress * (MAX_OPACITY - MIN_OPACITY);
          return (
            <a
              key={i}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { cardRefs.current[i] = el; }}
              className={styles.card}
              style={{
                ...(card.pos as React.CSSProperties),
                transform: `scale(${baseScale})`,
                transformOrigin: card.origin,
                opacity: baseOpacity,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.img} alt={card.label} className={styles.cardImage} />
              <p className={styles.cardLabel}>{card.label}</p>
            </a>
          );
        })}
      </div>

      {/* Hero SVG logo */}
      <div ref={logoRef} className={styles.logoWrapper}>
        <GearSumLogoSVG />
      </div>

    </section>
  );
}
