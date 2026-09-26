import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  onBookCall?: () => void;
}

const EXPERIENCES = [
  {
    id: 'va-freelance',
    role: 'Virtual Assistant',
    company: 'Freelance',
    period: 'Apr 2026 — Present',
    type: 'Current Role',
    description:
      'Global Virtual Assistant helping founders, CEOs, and creative professionals manage operations, workflows, communication, and AI-powered systems.',
  },
  {
    id: 'bp-ea-westsons',
    role: 'Business Partner EA',
    company: 'Westsons',
    period: 'Jun 2025 — Jul 2026',
    type: 'Executive Support',
    description:
      'Supported business operations and executive-level workflows, with a focus on organization and efficient day-to-day management.',
  },
  {
    id: 'project-assistant-nb',
    role: 'Project Assistant',
    company: 'Nigerian Breweries Plc',
    period: 'Apr 2022 — Jul 2026',
    type: 'Corporate Operations',
    description:
      'Supported cross-functional teams, customer operations, data management, and problem-solving to improve efficiency and customer experience.',
  },
  {
    id: 'va-grola',
    role: 'Virtual Assistant',
    company: 'Grola Executive Solutions',
    period: 'Nov 2021 — Apr 2022',
    type: 'Executive Support',
    description:
      'Managed calendars, recruitment coordination, confidential documentation, training logistics, and employee onboarding.',
  },
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onBookCall }) => {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      className="relative w-full bg-[#faf7f2] py-24 sm:py-32 overflow-hidden select-none border-t border-neutral-200/80"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (No pill badge, minimal clean typography) */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight leading-[1.15]">
              Experience &{' '}
              <span className="text-[#f16738]">
                Track Record
              </span>
            </h2>
            <p className="mt-4 text-neutral-600 font-body text-base sm:text-lg leading-relaxed">
              A track record of managing operations, coordinating schedules, and keeping projects on track for high-paced leaders.
            </p>
          </motion.div>
        </div>

        {/* Real Experience Cards (100% verified from Makkie's submission) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="space-y-6"
        >
          {EXPERIENCES.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:border-[#f16738]/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#f16738]">
                    {item.type}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs font-mono text-neutral-500 font-medium">
                    {item.period}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 tracking-tight">
                  {item.role}
                </h3>
                <p className="text-sm font-heading font-bold text-neutral-600 mt-1 mb-3">
                  {item.company}
                </p>

                <p className="font-body text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {item.description}
                </p>

              </div>

              <div className="shrink-0 self-start">
                <div className="w-12 h-12 rounded-2xl bg-[#f16738] text-white flex items-center justify-center font-bold shadow-sm">
                  <Briefcase className="w-5 h-5 stroke-[2.2]" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading font-bold text-lg text-white">
              Need reliable operational support for your team?
            </h4>
            <p className="text-neutral-400 font-body text-xs sm:text-sm mt-1">
              Currently accepting engagements for select founders and agencies.
            </p>
          </div>

          {onBookCall && (
            <button
              onClick={onBookCall}
              className="shrink-0 px-6 py-3 rounded-full bg-[#f16738] hover:bg-[#ff7847] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Get In Touch
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
