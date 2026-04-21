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
    function updateFromScroll() {
      if (window.scrollY <= 10) return;
      const mid = window.scrollY + window.innerHeight / 2;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) current = i;
      });
      setActive(current);
    }

    function onHeroProgress(e: Event) {
      if (window.scrollY > 10) return;
      const { progress } = (e as CustomEvent<{ progress: number }>).detail;
      setActive(progress >= 0.99 ? 1 : 0);
    }

    // When hero returns from section-2, reset counter to section-1
    function onHeroReturn() {
      setActive(0);
    }

    window.addEventListener("scroll",            updateFromScroll, { passive: true });
    window.addEventListener("heroProgress",       onHeroProgress);
    window.addEventListener("requestHeroReturn",  onHeroReturn);

    return () => {
      window.removeEventListener("scroll",           updateFromScroll);
      window.removeEventListener("heroProgress",      onHeroProgress);
      window.removeEventListener("requestHeroReturn", onHeroReturn);
    };
  }, []);

  function handleClick(id: string) {
    if (id === "section-1") {
      // Section-1 is the hero — may need reverse animation rather than scrollIntoView
      const section2 = document.getElementById("section-2");
      if (section2) {
        const rect = section2.getBoundingClientRect();
        if (rect.top > -20 && rect.top < 20) {
          // Section-2 is currently active → trigger hero reverse
          window.dispatchEvent(new Event("requestHeroReturn"));
          return;
        }
      }
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={styles.counter}>
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={i === active ? styles.active : styles.inactive}
          onClick={() => handleClick(s.id)}
          aria-label={`Go to section ${s.label}`}
        >
          [{s.label}]
        </button>
      ))}
    </div>
  );
}
