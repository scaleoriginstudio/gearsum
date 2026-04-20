"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin for one viewport-height of scroll — same pattern as About
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
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.inner}>

        {/* Left — contact details */}
        <div className={styles.details}>
          <h2 className={styles.heading}>Get in touch.</h2>
          <p className={styles.sub}>
            Got a question about an order, a product, or just want to say hello?
            We read every message.
          </p>

          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.label}>Email</span>
              <a href="mailto:hello@gearsum.com" className={styles.value}>
                hello@gearsum.com
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.label}>Phone</span>
              <a href="tel:+919876543210" className={styles.value}>
                +91 98765 43210
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.label}>Address</span>
              <span className={styles.value}>
                14 Maker Chambers, Nariman Point<br />
                Mumbai 400 021, India
              </span>
            </li>
          </ul>
        </div>

        {/* Right — contact form */}
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="cf-name" className={styles.fieldLabel}>Name</label>
              <input
                id="cf-name"
                type="text"
                placeholder="Your name"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="cf-email" className={styles.fieldLabel}>Email</label>
              <input
                id="cf-email"
                type="email"
                placeholder="you@example.com"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-message" className={styles.fieldLabel}>Message</label>
            <textarea
              id="cf-message"
              placeholder="What would you like to say?"
              className={styles.textarea}
              rows={5}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Send message
          </button>

        </form>

      </div>
    </section>
  );
}
