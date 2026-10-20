"use client";
import Link from "next/link";
import Image from "@/components/brand-image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowDown, Heart, Sparkles } from "lucide-react";
export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero-v2">
      <div className="hero-grain" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-content">
          <motion.p
            className="hero-kicker"
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span /> HANDMADE GIFTS. HEARTFELT CONNECTIONS.
          </motion.p>
          <h1>
            <span className="hero-line">
              <motion.span
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Not just gifts.
              </motion.span>
            </span>
            <span className="hero-line">
              <motion.span
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Little pieces
              </motion.span>
            </span>
            <span className="hero-line hero-emphasis">
              <motion.em
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                of your heart.
                <svg viewBox="0 0 480 30" aria-hidden="true">
                  <motion.path
                    d="M8 20 Q220 -5 470 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </svg>
              </motion.em>
            </span>
          </h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <p className="hero-description">
              For the big milestones. The little wins.
              <br />
              And the beautiful, ordinary <em>just-becauses.</em>
              <br />
              Make their day with something made for them.
            </p>
            <div className="hero-buttons">
              <Link href="/shop" className="button button-primary">
                Find their perfect gift <ArrowUpRight size={19} />
              </Link>
              <Link href="/contact" className="button hero-secondary">
                Make it personal <Heart size={16} />
              </Link>
            </div>
            <div className="hero-bottom-note">
              <div className="tiny-flower">✿</div>
              <p>
                A little thought.
                <br />
                <strong>A whole lot of feeling.</strong>
              </p>
              <span className="hero-scribble">made to mean more ↗</span>
            </div>
          </motion.div>
        </div>
        <div className="hero-collage">
          <div className="collage-orbit" aria-hidden="true" />
          <motion.div
            className="photo-main"
            initial={reduced ? false : { opacity: 0, y: 50, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: -7 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="photo-tape" />
            <Image
              src="/images/flower-pot.jpeg"
              alt="Supplied reference of pink handcrafted flowers in a small pot"
              fill
              priority
              sizes="(max-width: 700px) 65vw, 380px"
            />
            <div className="photo-caption">
              a little bloom. a lasting smile. ♡
            </div>
          </motion.div>
          <motion.div
            className="photo-secondary"
            initial={reduced ? false : { opacity: 0, y: 60, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: 9 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/photo-bouquet.jpg"
              alt="Supplied inspiration reference of a personalized photo bouquet"
              fill
              sizes="(max-width: 700px) 40vw, 240px"
            />
            <span>
              their favourite memories,
              <br />
              <em>all wrapped up.</em>
            </span>
          </motion.div>
          <motion.div
            className="floating-pill pill-love"
            animate={reduced ? {} : { y: [0, -9, 0], rotate: [-5, -2, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={15} fill="currentColor" /> Made with love
          </motion.div>
          <motion.div
            className="floating-pill pill-you"
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={15} /> Uniquely yours
          </motion.div>
          <div className="flower-sticker" aria-hidden="true">
            ✿
          </div>
          <div className="collage-label">
            THE BLOOMIES MOODBOARD
            <br />
            <span>Supplied inspiration imagery</span>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#gift-world">
        SCROLL TO FIND A LITTLE JOY <ArrowDown size={14} />
      </a>
      <div className="hero-index" aria-hidden="true">
        01 — THE FEELING OF GIVING
      </div>
    </section>
  );
}
