"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight}`,
        pin: true,
        anticipatePin: 1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logoText} aria-label="Gearsum home">
            gear<span className={styles.logoS}>$</span>um
            <span className={styles.logoDotCom}>.com</span>
          </Link>
          <div className={styles.iconRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/bags">  <img src="/img/bagicon.svg"    alt="Bags"   className={styles.icon} /></Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/shirts"><img src="/img/shirticon.svg" alt="Shirts" className={styles.icon} /></Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/mugs"> <img src="/img/mugicon.svg"    alt="Mugs"   className={styles.icon} /></Link>
          </div>
        </div>
        <button className={styles.hamburger} aria-label="Open menu">
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </header>

      {/* ── Two-column body ── */}
      <div className={styles.body}>

        {/* Left: story copy */}
        <div className={styles.textCol}>
          <p className={styles.para}>Honestly? This whole thing started because we were tired.</p>
          <p className={styles.para}>
            Tired of paying crazy prices for stuff our kids would outgrow in three months.
            Tired of buying cheap things that broke in a week. Tired of feeling like bad
            parents every time we said no at the checkout.
          </p>
          <p className={styles.para}>
            Between us, we have a house full of kids. They all want things. Good things.
            Cool things. And we work hard, but money doesn&apos;t grow on trees. So we
            started doing what any stubborn parent does. We figured it out ourselves.
            We spent months going through vendors, testing products, returning things
            that didn&apos;t make the cut. Asking the most important question every single
            time: would we buy this with our own money for our own kids? If the answer
            was no, it was out.
          </p>
          <p className={styles.para}>
            What&apos;s on Gearsum today is what survived that process. Real products from
            good vendors, chosen by parents who actually care, sold at prices that
            don&apos;t make you wince.
          </p>
          <p className={styles.para}>
            We are not making anything ourselves. We are just very, very picky about
            what we bring to you. And we think that matters more than most people realize.
          </p>
          <p className={styles.para}>
            Because any parent knows the feeling. You want the best for your kids and
            you still have to watch the budget. You shouldn&apos;t have to choose between
            the two.
          </p>
        </div>

        {/* Right: photo + "Why us?" overlay */}
        <div className={styles.imageCol}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/gear1.webp" alt="Gearsum gear" className={styles.photo} />
          <p className={styles.whyUs}>Why us?</p>
        </div>

      </div>

      {/* ── Bottom CTA ── */}
      <div className={styles.bottomBar}>
        <p className={styles.tagline}>That&apos;s what Gearsum is for.</p>
        <Link href="/shop" className={styles.shopBtn}>
          Shop now
          <span className={styles.shopIcon}>&#x2197;</span>
        </Link>
      </div>

    </section>
  );
}
