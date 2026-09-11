import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { MorphingOrangeShape } from './MorphingOrangeShape';
import { InteractivePhoto } from './InteractivePhoto';
import { ArrowUpRight, Star, Quote, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onHireMe: () => void;
  onServicesClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onHireMe, onServicesClick }) => {
  const heroRef = useRef<HTMLElement>(null);

  // Normalized cursor coordinates for parallax (-0.5 to 0.5)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Luxurious, smooth fluid spring physics
  const springConfig = { damping: 26, stiffness: 80, mass: 0.9 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Multi-plane parallax transforms for immersive depth
  // Background arch shape moves with highest travel distance
  const shapeParallaxX = useTransform(smoothMouseX, (val) => val * 36);
  const shapeParallaxY = useTransform(smoothMouseY, (val) => val * 24);

  // Cutout photo moves in foreground
  const photoParallaxX = useTransform(smoothMouseX, (val) => val * 16);
  const photoParallaxY = useTransform(smoothMouseY, (val) => val * 12);

  // 3D Tilt for photo
  const tiltX = useTransform(smoothMouseY, (val) => -val * 7);
  const tiltY = useTransform(smoothMouseX, (val) => val * 7);

  // Floating testimonial quote on the left (counter-parallax)
  const leftCardParallaxX = useTransform(smoothMouseX, (val) => val * -14);
  const leftCardParallaxY = useTransform(smoothMouseY, (val) => val * -10);

  // Floating experience card on the right (counter-parallax)
  const rightCardParallaxX = useTransform(smoothMouseX, (val) => val * -16);
  const rightCardParallaxY = useTransform(smoothMouseY, (val) => val * -10);

  // Silky, lag-free parallax with IntersectionObserver guard and requestAnimationFrame
  useEffect(() => {
    let isInView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (!isInView) {
          rawMouseX.set(0);
          rawMouseY.set(0);
        }
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    let ticking = false;
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isInView || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        rawMouseX.set(x);
        rawMouseY.set(y);
        ticking = false;
      });
    };

    const handleWindowLeave = () => {
      rawMouseX.set(0);
      rawMouseY.set(0);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleWindowLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleWindowLeave);
    };
  }, [rawMouseX, rawMouseY]);

  const easeCurve = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-12 sm:pb-16 flex flex-col items-center select-none"
    >
      {/* Soft ambient luxury background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-[#f16738]/[0.09] via-[#f16738]/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. Large Confident Headline: "I'm Makkie, Your Behind-The-Scenes CEO" with Bespoke Accents */}
      <motion.div
        id="hero-headline-container"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.15, ease: easeCurve }}
        className="text-center relative mb-4 sm:mb-6"
      >
        {/* Left Side: Playful Spark & Accents */}
        <div className="hidden sm:flex flex-col items-center absolute -left-10 lg:-left-16 bottom-6 text-[#f16738] pointer-events-none">
          <motion.div
            animate={{
              rotate: [0, 12, -8, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-1"
          >
            <Sparkles className="w-5 h-5 text-[#f16738] fill-[#f16738]/20" />
          </motion.div>
          {/* Doodle speed-rays */}
          <svg
            width="28"
            height="26"
            viewBox="0 0 28 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M22 6L4 20" />
            <path d="M24 14L10 24" />
            <path d="M16 2L2 12" />
          </svg>
        </div>

        {/* Right Side: Subtle floating micro-sparkle */}
        <div className="hidden sm:flex flex-col items-center absolute -right-6 lg:-right-10 top-2 text-[#f16738] pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.25, 0.9, 1],
              rotate: [0, -15, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-4 h-4 text-[#f16738] fill-[#f16738]/25" />
          </motion.div>
        </div>

        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.15rem] leading-[1.07] tracking-tight text-[#111111] drop-shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          I'm Makkie,
          <br />
          <span className="relative inline-block mt-1 sm:mt-2">
            {/* Warm subtle ambient backlight */}
            <span className="absolute -inset-x-4 -inset-y-2 bg-[#f16738]/14 blur-xl rounded-full pointer-events-none -z-10" />

            {/* Gradient text with rich vibrant terracotta tone */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f16738] via-[#ff7847] to-[#e45220]">
              Your Behind-The-Scenes CEO
            </span>

            {/* Hand-drawn organic underline swoosh beneath */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#f16738] pointer-events-none overflow-visible"
              viewBox="0 0 160 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M3 14C35 5 110 4 157 11C130 16 75 16 18 15"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </h1>

        {/* Refined Tagline Pill */}
        <motion.div
          id="hero-tagline-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: easeCurve }}
          className="mt-3.5 sm:mt-4 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.04)] text-neutral-700 text-xs sm:text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f16738] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f16738]" />
            </span>
            <span className="tracking-tight font-medium text-neutral-800">
              You run the vision. I run everything else.
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Center Section: Flanked by Left Testimonial and Right Experience Stat */}
      <div className="w-full relative flex items-center justify-center">
        {/* Left Side: Testimonial Quote Callout with subtle float & counter-parallax */}
        <motion.div
          id="hero-left-testimonial"
          style={{
            x: leftCardParallaxX,
            y: leftCardParallaxY,
          }}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: easeCurve }}
          className="hidden md:block absolute left-2 lg:left-8 top-14 max-w-[215px] lg:max-w-[250px] z-20 text-left bg-white/90 backdrop-blur-md p-4 sm:p-4.5 rounded-2xl border border-white/80 shadow-[0_12px_32px_rgba(20,20,20,0.06),0_1px_2px_rgba(0,0,0,0.02)]"
        >
          {/* Header row with warm terracotta quote badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#f16738]/10 flex items-center justify-center text-[#f16738]">
              <Quote className="w-3.5 h-3.5 fill-[#f16738] stroke-none" />
            </div>
            <span className="text-[10px] font-heading font-semibold tracking-wider text-neutral-400 uppercase">
              Founder Review
            </span>
          </div>
          <p className="font-body text-xs lg:text-[13px] text-neutral-700 leading-relaxed font-normal">
            &ldquo;Makkie turned our inbox chaos into clockwork. Leads that used to vanish are now closing. She just gets it done.&rdquo;
          </p>
          <div className="mt-2.5 pt-2 border-t border-neutral-100/90 flex items-center justify-between text-[11px]">
            <span className="font-medium text-neutral-500">Verified Client</span>
            <span className="text-[#f16738] font-bold">★ 5.0</span>
          </div>
        </motion.div>

        {/* Center: Orange Arch Dome + Cutout Photo */}
        <motion.div
          id="hero-photo-cluster"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: easeCurve }}
          className="relative flex flex-col items-center justify-center w-full max-w-lg cursor-pointer"
        >
          {/* Orange Arch Shape in the background with deep parallax */}
          <MorphingOrangeShape mouseX={shapeParallaxX} mouseY={shapeParallaxY} />

          {/* Portrait in front with foreground parallax & 3D tilt */}
          <InteractivePhoto
            photoX={photoParallaxX}
            photoY={photoParallaxY}
            tiltX={tiltX}
            tiltY={tiltY}
          />
        </motion.div>

        {/* Right Side: 5 Stars + 3rd Week Chaos Fixed Stat with counter-parallax */}
        <motion.div
          id="hero-right-experience"
          style={{
            x: rightCardParallaxX,
            y: rightCardParallaxY,
          }}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: easeCurve }}
          className="hidden md:block absolute right-2 lg:right-8 top-14 text-right z-20 bg-white/90 backdrop-blur-md p-4 sm:p-4.5 rounded-2xl border border-white/80 shadow-[0_12px_32px_rgba(20,20,20,0.06),0_1px_2px_rgba(0,0,0,0.02)] max-w-[205px] lg:max-w-[235px]"
        >
          {/* 5 Stars with warm terracotta glow */}
          <div className="flex items-center justify-end gap-1 mb-1.5 text-[#f16738]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#f16738] stroke-none drop-shadow-[0_1px_4px_rgba(241,103,56,0.3)]" />
            ))}
          </div>

          <div className="font-heading font-extrabold text-2xl lg:text-3xl text-neutral-900 tracking-tight leading-none">
            3rd Week
          </div>
          <div className="font-body text-xs lg:text-sm text-neutral-600 font-medium mt-1 leading-snug">
            Was All It Took To Fix The Chaos
          </div>
        </motion.div>
      </div>

      {/* Mobile-only view for testimonial & experience */}
      <div className="flex md:hidden items-center justify-between w-full max-w-sm mt-3 px-2 text-xs gap-3">
        <div className="text-left flex-1 bg-white/90 p-3 rounded-xl border border-neutral-200/60 shadow-sm">
          <Quote className="w-3.5 h-3.5 fill-[#f16738] stroke-none mb-1 inline-block" />
          <span className="text-[11px] text-neutral-700 block leading-tight">
            &ldquo;Makkie turned our inbox chaos into clockwork. Leads that used to vanish are now closing. She just gets it done.&rdquo;
          </span>
        </div>
        <div className="text-right flex-1 bg-white/90 p-3 rounded-xl border border-neutral-200/60 shadow-sm">
          <div className="flex items-center justify-end gap-0.5 mb-1 text-[#f16738]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#f16738] stroke-none" />
            ))}
          </div>
          <div className="font-bold text-neutral-900 text-sm leading-tight">3rd Week</div>
          <div className="text-[10px] text-neutral-600 leading-tight mt-0.5">Was All It Took To Fix The Chaos</div>
        </div>
      </div>

      {/* 3. LOWERED ACTION BUTTONS: Portfolio ↗ | Say Hi 👋 */}
      <motion.div
        id="hero-action-dock"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: easeCurve }}
        className="relative z-30 mt-6 sm:mt-8 flex items-center justify-center"
      >
        {/* Sleek Dual Pill Dock */}
        <div className="bg-[#101114]/95 backdrop-blur-md p-1.5 rounded-full border border-neutral-800/80 shadow-[0_14px_36px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.08)_inset] flex items-center gap-1 sm:gap-2">
          {/* Primary: Explore Services ↗ */}
          <button
            id="hero-services-btn"
            onClick={onServicesClick}
            className="flex items-center gap-2 bg-gradient-to-r from-[#f16738] to-[#e45220] hover:from-[#f37447] hover:to-[#ea5c2b] text-white font-heading font-semibold text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-[0_4px_16px_rgba(241,103,56,0.35)] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Secondary: Say Hi 👋 */}
          <button
            id="hero-say-hi-btn"
            onClick={onHireMe}
            className="flex items-center justify-center gap-1.5 text-neutral-200 hover:text-white hover:bg-white/10 font-heading font-medium text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Say Hi</span>
            <span className="text-sm">👋</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

