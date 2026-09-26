import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onBookCall?: () => void;
  onExploreServices?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onBookCall,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative w-full bg-[#faf7f2] py-24 sm:py-32 overflow-hidden select-none border-t border-neutral-200/80"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Portrait Card (matching screenshot 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="w-full max-w-[380px] bg-white rounded-[2rem] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-neutral-200/80">
              
              {/* Photo */}
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#eedbd0]">
                <img
                  src="/makkie_photo.jpeg"
                  alt="Chiamaka 'Makkie' Ossai"
                  className="w-full h-full object-cover object-top filter contrast-[1.02]"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* Caption under photo */}
              <div className="pt-5 pb-2 text-left">
                <h3 className="font-heading font-black text-xl text-neutral-900 tracking-tight">
                  Chiamaka Ossai
                </h3>
                <p className="text-sm font-body text-neutral-500 mt-0.5">
                  Operations Specialist
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT: Editorial Narrative (matching screenshot 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Headline matching screenshot 2 with badge */}
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.08] mb-6">
              <span className="bg-[#f16738] text-white px-3.5 py-1 rounded-xl inline-block mr-2 font-black">
                More
              </span>
              than an Executive Assistant.
            </h2>

            {/* Narrative text (Makkie's real information) */}
            <div className="space-y-4 font-body text-neutral-700 text-base sm:text-lg leading-[1.85]">
              <p>
                Hi, I'm <strong className="text-neutral-900 font-bold">Chiamaka</strong> — but you can call me <strong className="text-[#f16738] font-bold">Makkie</strong>. I'm an Executive Assistant and Operations Manager based in Lagos, Nigeria, holding a Master's degree in Information Management.
              </p>
              <p>
                I currently support a <span className="text-neutral-900 font-semibold">multi-client creative agency</span> as EA/Ops Manager — taking complete ownership of inboxes, calendars, meeting cadences, client pipelines, and internal tracking systems so leadership can focus entirely on high-value growth.
              </p>
              <p>
                From coordinating complex schedules to architecting workspaces in ClickUp, HoneyBook, Google Workspace, and Discord — I specialize in transforming scattered operational chaos into clear, repeatable systems that fast-moving teams can count on.
              </p>
            </div>

            {/* Action Buttons matching screenshot 2 */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {onBookCall && (
                <button
                  onClick={onBookCall}
                  className="px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span>Work With Makkie</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5]/5 font-heading font-bold text-xs tracking-wider transition-all flex items-center gap-2 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
                <span>Find me on LinkedIn</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
