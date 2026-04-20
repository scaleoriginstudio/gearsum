"use client";

import Link from "next/link";
import styles from "./SecondSection.module.css";

export default function SecondSection() {
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

      {/* Dark gradient overlay — heavier at bottom */}
      <div className={styles.overlay} />

      {/* ── Header row ── */}
      <header className={styles.header}>

        <div className={styles.logoArea}>
          <Link href="/" className={styles.logoText} aria-label="Gearsum home">
            gear<span className={styles.logoS}>$</span>um
            <span className={styles.logoDotCom}>.com</span>
          </Link>
          <div className={styles.iconRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/bags">  <img src="/img/bagicon.svg"    alt="Bags"    className={styles.icon} /></Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/shirts"><img src="/img/shirticon.svg" alt="Shirts"  className={styles.icon} /></Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/mugs"> <img src="/img/mugicon.svg"    alt="Mugs"    className={styles.icon} /></Link>
          </div>
        </div>

        <button className={styles.hamburger} aria-label="Open menu">
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

      </header>

      {/* ── Bottom content ── */}
      <div className={styles.content}>
        <p className={styles.tagline}>
          You know the <strong><em>drill</em></strong>. the <strong><em>list</em></strong>,
          the <strong><em>rush</em></strong>, the<br />
          &ldquo;mum i need it by tomorrow.&rdquo; we&apos;ve got<br />
          everything before it becomes a crisis.
        </p>
        <Link href="/shop" className={styles.cta}>
          Explore our collection
        </Link>
      </div>

    </section>
  );
}
