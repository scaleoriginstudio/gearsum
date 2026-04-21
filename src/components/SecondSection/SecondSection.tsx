"use client";

import { useState, useEffect } from "react";
import styles from "./SecondSection.module.css";

export default function SecondSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Swipe-up / scroll-up on section-2 → reverse hero animation
  useEffect(() => {
    let handled = false;
    let touchStartY = 0;

    function isSection2Active() {
      const section2 = document.getElementById("section-2");
      if (!section2) return false;
      const rect = section2.getBoundingClientRect();
      // Section-2 is at the top of the viewport when the hero has slid away
      return rect.top > -20 && rect.top < 20;
    }

    function triggerReturn() {
      if (handled) return;
      handled = true;
      window.dispatchEvent(new Event("requestHeroReturn"));
      setTimeout(() => { handled = false; }, 1500);
    }

    function onWheel(e: WheelEvent) {
      if (!isSection2Active()) return;
      if (e.deltaY < 0) {
        e.preventDefault();
        triggerReturn();
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (!isSection2Active()) return;
      const dy = e.touches[0].clientY - touchStartY;
      if (dy > 40) triggerReturn(); // swipe down = scroll up = go back to hero
    }

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
    };
  }, []);

  return (
    <section id="section-2" className={styles.section}>

      {/* Background video */}
      <video
        className={styles.video}
        src="/img/video_preview_h264.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark gradient overlay */}
      <div className={styles.overlay} />

      {/* Full-screen nav menu */}
      {menuOpen && (
        <div className={styles.menuOverlay} onClick={() => setMenuOpen(false)}>
          <div className={styles.menuPanel} onClick={e => e.stopPropagation()}>
            <button
              className={styles.menuClose}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              &#x2715;
            </button>
            <nav className={styles.menuNav}>
              <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuLink}
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </a>
              <a href="#about"   className={styles.menuLink} onClick={() => setMenuOpen(false)}>About</a>
              <a href="#contact" className={styles.menuLink} onClick={() => setMenuOpen(false)}>Contact</a>
            </nav>
          </div>
        </div>
      )}

      {/* ── Header row ── */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <a href="/" className={styles.logoText} aria-label="Gearsum home">
            gear<span className={styles.logoS}>$</span>um
            <span className={styles.logoDotCom}>.com</span>
          </a>
          <div className={styles.iconRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer"><img src="/img/bagicon.svg"    alt="Bags"   className={styles.icon} /></a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer"><img src="/img/shirticon.svg" alt="Shirts" className={styles.icon} /></a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer"><img src="/img/mugicon.svg"   alt="Mugs"   className={styles.icon} /></a>
          </div>
        </div>

        <button
          className={styles.hamburger}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </header>

      {/* ── Bottom content ── */}
      <div className={styles.content}>
        <p className={styles.tagline}>
          You know the <strong><em>drill</em></strong>. the <strong><em>list</em></strong>,
          the <strong><em>rush</em></strong>, the &ldquo;mum i need it by tomorrow.&rdquo; we&apos;ve got
          everything before it becomes a crisis.
        </p>
        <a
          href="https://www.amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Explore our collection
        </a>
      </div>

    </section>
  );
}
