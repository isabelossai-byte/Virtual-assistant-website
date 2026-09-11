import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onBookCall?: () => void;
  onExploreServices?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreServices,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Native Intersection Observer for subtle scroll-triggered fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 select-none"
    >
      {/* Sleek Top Divider with Right-Aligned "The Story" Marker */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 sm:mb-20 flex items-center justify-end border-b border-neutral-200/90 pb-4 sm:pb-5"
      >
        {/* Right-aligned "The Story" */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.24em] text-neutral-900 font-bold">
            The Story
          </span>
          <span className="w-2 h-2 rounded-full bg-[#f16738]" />
        </div>
      </motion.div>

      {/* Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ================= LEFT COLUMN: SCULPTURAL ARCH PORTRAIT ================= */}
        <motion.div
          id="about-photo-column"
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Main Visual Composition Arch Silhouette */}
          <div className="relative w-full max-w-[320px] sm:max-w-[370px] flex items-end justify-center">
            
            {/* Subtle warm backlight diffusion */}
            <div className="absolute inset-0 bg-[#f16738]/15 blur-3xl rounded-full transform -translate-y-4 scale-95 pointer-events-none -z-10" />

            {/* Delicate decorative hairline arc offset behind */}
            <div className="absolute -inset-2.5 rounded-t-full rounded-b-[3rem] border border-[#f16738]/20 pointer-events-none -z-10 transform -rotate-1" />

            {/* Architectural Arch Canvas with warm terracotta tone */}
            <div className="relative w-full aspect-[4/5] rounded-t-full rounded-b-[2.5rem] sm:rounded-b-[2.75rem] bg-gradient-to-b from-[#f16738] via-[#e24e1c] to-[#b83811] shadow-[0_24px_55px_rgba(241,103,56,0.28)] ring-1 ring-white/20 overflow-hidden flex items-end justify-center">
              
              {/* Subtle top rim highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              
              {/* Inner ambient vignette */}
              <div className="absolute -top-12 inset-x-0 h-44 bg-radial from-white/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Working Photo of Makkie at laptop */}
              <div className="relative z-10 w-full h-full flex items-end justify-center">
                <img
                  src="/vladi_cutout.png"
                  alt="Makkie working at laptop"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-[94%] sm:w-[90%] h-auto max-h-[97%] object-contain object-bottom drop-shadow-[0_22px_32px_rgba(0,0,0,0.38)] filter contrast-[1.02]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: EDITORIAL NARRATIVE ================= */}
        <div
          id="about-content-column"
          className="lg:col-span-7 flex flex-col justify-start text-left max-w-2xl"
        >
          {/* Main Headline: "From Chaos to Clockwork" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6 sm:mb-8"
          >
            <h3
              id="about-heading"
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-neutral-900 tracking-tight leading-[1.12]"
            >
              From Chaos to{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f16738] via-[#ff7847] to-[#e45220]">
                  Clockwork
                </span>
                
                {/* Hand-drawn organic swoosh underline matching hero section */}
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#f16738] overflow-visible pointer-events-none"
                  viewBox="0 0 100 20"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 2 14 Q 50 2, 98 12"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </h3>
          </motion.div>

          {/* Body Copy (Consistent rich contrast, generous line spacing, gentle scroll fade) */}
          <div
            id="about-body-copy"
            className="font-body text-neutral-900 text-base sm:text-[17px] leading-[1.8] sm:leading-[1.85] space-y-4 sm:space-y-5"
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-900"
            >
              Most founders don't lose money because their offer is bad or their marketing is broken. They lose it because nobody's holding the operation together — emails pile up, leads go cold, and clients get tired of chasing answers.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-900"
            >
              I saw this firsthand with a creative agency founder in New York. Brilliant at his craft, but his backend was a full-blown disaster — leads disappearing, inbox chaos, a ClickUp board nobody had touched in months.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-900"
            >
              I stepped in, built the inbox system from scratch, cleaned up the pipeline, and got client communication running like clockwork. Every stakeholder heard from us, on time, every time.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, delay: 0.40, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-900"
            >
              By the third week, opportunities that used to slip through the cracks were converting. Revenue went up. I even revived a lead he'd written off from Google. He finally had the space to run his business again.
            </motion.p>
          </div>

          {/* Pull-Quote: Timeless Editorial Highlight (Pure typography with accent left border) */}
          <motion.blockquote
            id="about-pull-quote"
            initial={{ opacity: 0, x: -10 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="my-7 sm:my-8 pl-5 sm:pl-6 border-l-2 border-[#f16738] py-1"
          >
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-neutral-900 tracking-tight leading-snug">
              &ldquo;Within 3 weeks, leads that used to vanish were converting.&rdquo;
            </p>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f16738] font-semibold mt-2 block">
              — Verified Turnaround Result
            </span>
          </motion.blockquote>

          {/* Closing Transition Line */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              id="about-closing-line"
              className="font-heading font-bold text-lg sm:text-xl text-neutral-900 leading-snug tracking-tight"
            >
              That's what I do. I handle the infrastructure — so you can stop putting out fires and start building.
            </p>

            {onExploreServices && (
              <button
                onClick={onExploreServices}
                className="mt-3.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-semibold text-[#f16738] hover:text-[#d84819] transition-colors cursor-pointer group"
              >
                <span>Explore how I execute this across your business</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
