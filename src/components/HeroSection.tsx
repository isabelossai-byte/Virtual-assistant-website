import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface HeroSectionProps {
  onHireMe: () => void;
  onServicesClick?: () => void;
}

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: 'Multi-Client', label: 'Creative Agency' },
  { value: '100%', label: 'Remote & Global' },
  { value: 'ClickUp · GWS', label: 'HoneyBook · Clockify' },
];

const MARQUEE_ITEMS = [
  'Halucinated Studios',
  'ClickUp',
  'Nigerian Breweries',
  'Google Workspace',
  'Westsons',
  'HoneyBook',
  'Clockify',
  'Discord',
  'Systems & SOPs',
  'Pipeline Architecture',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onHireMe, onServicesClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springConfig = { damping: 26, stiffness: 80, mass: 0.9 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  const photoParallaxX = useTransform(smoothMouseX, (val) => val * 10);
  const photoParallaxY = useTransform(smoothMouseY, (val) => val * 8);
  const tiltX = useTransform(smoothMouseY, (val) => -val * 5);
  const tiltY = useTransform(smoothMouseX, (val) => val * 5);

  useEffect(() => {
    let isInView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (!isInView) { rawMouseX.set(0); rawMouseY.set(0); }
      },
      { threshold: 0.05 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    let ticking = false;
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isInView || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        rawMouseX.set(e.clientX / window.innerWidth - 0.5);
        rawMouseY.set(e.clientY / window.innerHeight - 0.5);
        ticking = false;
      });
    };
    const handleWindowLeave = () => { rawMouseX.set(0); rawMouseY.set(0); };
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleWindowLeave);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleWindowLeave);
    };
  }, [rawMouseX, rawMouseY]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative w-full bg-[#0A0118] overflow-hidden select-none"
    >
      {/* Subtle luxury dot matrix texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-0">

        {/* ── HEADLINE (Without eyebrow pill) ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className="text-center mb-10 sm:mb-12"
        >
          {/* Main headline — large, bold & editorial */}
          <h1 className="font-heading font-black text-white leading-[1.04] tracking-tight">
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              The{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f16738] via-[#ff7e50] to-[#f16738]">
                  Operations
                </span>
                {/* Luminous hand-drawn squiggly underline */}
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-[#f16738] pointer-events-none overflow-visible"
                  viewBox="0 0 160 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7 C30 2, 60 12, 90 7 C120 2, 150 12, 158 7"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mt-1.5 text-white/95">
              Backbone Behind
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mt-1.5 text-white/95">
              Fast-Moving Teams
            </span>
          </h1>

          {/* Sub-tagline */}
          <p className="mt-6 sm:mt-7 text-neutral-300 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Hi, I'm <span className="text-white font-semibold">Makkie</span> — I handle the operational chaos so you don't have to.
            Inbox, calendar, pipeline, systems. All of it.
          </p>
        </motion.div>

        {/* ── PHOTO + ARCH SHOWCASE (Clean, NO blurry glow shade) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.25, ease }}
          className="relative flex justify-center items-end"
          style={{ minHeight: '340px' }}
        >
          {/* Floating Review Card: Left */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="hidden lg:block absolute left-0 xl:-left-4 top-12 z-20 w-[285px] rounded-2xl bg-[#120826]/95 backdrop-blur-xl border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <p className="text-neutral-200 font-body text-xs sm:text-[13px] leading-relaxed">
              &ldquo;Ever since Makkie joined, things have gotten so much smoother. I’m genuinely glad she was brought on board.&rdquo;
            </p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-neutral-400 font-mono text-[11px]">
                — Steve Lucin, CEO, Halucinated Studios
              </p>
            </div>
          </motion.div>

          {/* Floating Card: Right (5+ Years Experience) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="hidden lg:block absolute right-0 xl:-right-4 top-14 z-20 w-[240px] rounded-2xl bg-[#120826]/95 backdrop-blur-xl border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-black text-3xl text-white tracking-tight">5+</span>
              <span className="w-2 h-2 rounded-full bg-[#f16738]" />
            </div>
            <p className="font-heading font-bold text-sm text-white leading-tight">
              Years Experience
            </p>
            <p className="font-body text-xs text-neutral-400 mt-1 leading-snug">
              Executive Assistant & Ops Management
            </p>
          </motion.div>

          {/* Central Portrait Arch (Crisp, clean, NO glow shade) */}
          <motion.div
            id="hero-photo-cluster"
            style={{ x: photoParallaxX, y: photoParallaxY, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
            className="relative flex flex-col items-center"
          >
            {/* Crisp Architectural Arch Frame */}
            <div
              className="relative w-[270px] sm:w-[350px] md:w-[410px] overflow-hidden border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
              style={{
                borderTopLeftRadius: '210px',
                borderTopRightRadius: '210px',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                aspectRatio: '1 / 1.15',
                background: 'linear-gradient(180deg, #f16738 0%, #e24e1c 45%, #7a1d05 100%)',
              }}
            >
              {/* Glossy top rim highlight */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-t-[210px] pointer-events-none z-10" />
              
              {/* Bottom vignette for smooth transition */}
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

              {/* Makkie Photo */}
              <img
                src="/makkie_photo.jpeg"
                alt="Chiamaka 'Makkie' Ossai — Operations Specialist"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── STATS BAR ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease }}
          className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.08] rounded-2xl overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-5 sm:py-6 px-4 bg-[#0A0118]/85 hover:bg-white/[0.04] transition-colors">
              <span className="font-heading font-black text-white text-xl sm:text-2xl tracking-tight">{stat.value}</span>
              <span className="font-body text-neutral-400 text-[11px] sm:text-xs mt-1 text-center leading-snug">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── CTA BUTTONS ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.6, ease }}
          className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 pb-14 sm:pb-18"
        >
          <button
            id="hero-services-btn"
            onClick={onServicesClick}
            className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#f16738] via-[#f87143] to-[#e05220] hover:from-[#ff7a4b] hover:to-[#ea5c2b] text-white font-heading font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(241,103,56,0.45),0_1px_0_rgba(255,255,255,0.25)_inset] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>View Services</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            id="hero-contact-btn"
            onClick={onHireMe}
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-heading font-bold text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer backdrop-blur-md shadow-sm"
          >
            <Mail className="w-4 h-4 text-neutral-300" />
            <span>Contact Me</span>
          </button>
        </motion.div>
      </div>

      {/* ── MARQUEE TICKER (Matching designwithjazz screenshot) ── */}
      <div className="relative w-full bg-[#05000c] border-y border-white/15 py-4 sm:py-5 overflow-hidden flex items-center">
        {/* Soft edge gradient fades for seamless bleed on left and right */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#05000c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#05000c] to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling track */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap items-center font-heading font-black text-xs sm:text-sm tracking-[0.24em] uppercase text-neutral-300">
          {[...Array(3)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
              {MARQUEE_ITEMS.map((item, itemIdx) => (
                <React.Fragment key={`${loopIdx}-${itemIdx}`}>
                  <span className="hover:text-white transition-colors duration-200 cursor-default">
                    {item}
                  </span>
                  <span className="text-[#f16738] text-xs sm:text-sm">
                    ✦
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
