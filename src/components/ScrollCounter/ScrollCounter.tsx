"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollCounter.module.css";

const SECTIONS = [
  { id: "section-1", label: "01" },
  { id: "section-2", label: "02" },
  { id: "section-3", label: "03" },
  { id: "section-4", label: "04" },
];

export default function ScrollCounter() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Normal page-scroll detection (sections 2+)
    function updateFromScroll() {
      if (window.scrollY <= 10) return; // hero handles this range via heroProgress
      const mid = window.scrollY + window.innerHeight / 2;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) current = i;
      });
      setActive(current);
    }

    // Hero animation drives section 1 → 2 transition before any page scroll
    function onHeroProgress(e: Event) {
      if (window.scrollY > 10) return; // page already scrolled; ignore
      const { progress } = (e as CustomEvent<{ progress: number }>).detail;
      setActive(progress >= 0.99 ? 1 : 0);
    }

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("heroProgress", onHeroProgress);
    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("heroProgress", onHeroProgress);
    };
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={styles.counter}>
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={i === active ? styles.active : styles.inactive}
          onClick={() => scrollToSection(s.id)}
          aria-label={`Go to section ${s.label}`}
        >
          [{s.label}]
        </button>
      ))}
    </div>
  );
}
