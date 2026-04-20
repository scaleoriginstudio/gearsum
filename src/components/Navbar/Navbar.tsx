"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import GearSumLogoSVG from "@/components/HeroSection/GearSumLogoSVG";
import styles from "./Navbar.module.css";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // Smooth-scroll handler — only used on the homepage where sections exist
  function scrollTo(id: string) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1.4,
        ease: "power3.inOut",
      });
    };
  }

  // Styles that only apply on non-home pages
  const linkStyle = !isHome ? { color: "#37b9ac" } : undefined;

  return (
    <nav
      id="site-navbar"
      className={styles.navbar}
      // Inline style beats any CSS cascade — guarantees visibility on shop/other pages
      style={!isHome ? { visibility: "visible", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", paddingTop: "0", paddingBottom: "0" } : undefined}
    >

      {/* button avoids <a> inside <a> — GearSumLogoSVG has its own <a> tags */}
      <button
        className={styles.logoLink}
        aria-label="Gearsum — go to homepage"
        onClick={() => router.push("/")}
      >
        <div
          className={styles.logoWrapper}
          style={!isHome ? { filter: "none", height: "130px", width: "auto" } : undefined}
        >
          <GearSumLogoSVG />
        </div>
      </button>

      <ul className={styles.navLinks}>

        <li>
          <Link href="/shop" className={styles.navLink} style={linkStyle}>
            Shop
          </Link>
        </li>

        <li>
          {isHome ? (
            // On homepage: smooth-scroll to the section
            <a href="#about" className={styles.navLink} onClick={scrollTo("about")}>
              About us
            </a>
          ) : (
            // On other pages: navigate to homepage and jump to section
            <Link href="/#about" className={styles.navLink} style={linkStyle}>
              About us
            </Link>
          )}
        </li>

        <li>
          {isHome ? (
            <a href="#contact" className={styles.navLink} onClick={scrollTo("contact")}>
              Contact us
            </a>
          ) : (
            <Link href="/#contact" className={styles.navLink} style={linkStyle}>
              Contact us
            </Link>
          )}
        </li>

      </ul>
    </nav>
  );
}
