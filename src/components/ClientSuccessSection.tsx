import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TESTIMONIALS = [
  {
    id: 'steve-lucin',
    name: 'Steve Lucin',
    role: 'CEO · Halucinated Studios',
    initials: 'SL',
    review:
      "Ever since Makkie joined, things have gotten so much smoother. I'm genuinely glad she was brought on board. The way she keeps everything organized and on track has made a real difference to how we operate day to day.",
  },
  {
    id: 'chukwudozie-onuoha',
    name: 'Chukwudozie Onuoha',
    role: 'Manager · Nigerian Breweries',
    initials: 'CO',
    review:
      "Makkie is a fast learner — she picks things up quickly and just gets to work. You don't have to spend time handholding or explaining things twice. She comes in, understands what's needed, and delivers.",
  },
  {
    id: 'westsons-ceo',
    name: 'CEO, Westsons',
    role: 'Chief Executive Officer · Westsons',
    initials: 'WS',
    review:
      "Makkie is proactive and reliable. She doesn't wait to be told what to do — she sees what needs to happen and takes care of it. I'd absolutely work with her again without hesitation.",
  },
];

export const ClientSuccessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;
  const t = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      id="client-success-section"
      className="relative w-full bg-[#0A0118] py-28 sm:py-36 overflow-hidden select-none"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#f16738]/6 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[350px] h-[280px] bg-[#f16738]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <span className="h-px w-10 bg-[#f16738]/60" />
          <span className="font-heading font-semibold text-[#f16738] text-xs uppercase tracking-[0.22em]">
            Kind Words
          </span>
          <span className="h-px w-10 bg-[#f16738]/60" />
        </motion.div>

        {/* Giant quote block — centre stage */}
        <div className="relative min-h-[280px] sm:min-h-[260px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease }}
              className="relative flex flex-col items-center"
            >
              {/* Decorative opening quote mark — visual, at the start */}
              <span
                aria-hidden="true"
                className="block font-heading font-black text-[5rem] sm:text-[6.5rem] leading-none text-[#f16738] mb-2 sm:mb-0 sm:-mb-4"
              >
                "
              </span>

              {/* The review text */}
              <p className="font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-white leading-[1.55] max-w-3xl">
                {t.review}
              </p>

              {/* Attribution */}
              <div className="mt-10 flex flex-col items-center gap-2">
                <div className="w-8 h-0.5 rounded-full bg-[#f16738] mb-2" />
                <p className="font-heading font-bold text-white text-base tracking-tight">
                  {t.name}
                </p>
                <p className="font-body text-neutral-400 text-sm">
                  {t.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className="cursor-pointer group"
              aria-label={`Review ${idx + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  idx === active
                    ? 'w-8 h-1.5 bg-[#f16738]'
                    : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
