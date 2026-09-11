import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceSectionProps {
  onBookCall?: () => void;
}

interface TimelineExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

const EXPERIENCES: TimelineExperience[] = [
  {
    id: 'lead-ops-va-partner',
    role: 'Lead Virtual Assistant',
    company: 'Apex Growth Studio',
    period: '2022 – Present',
    description:
      'Executive support for company founders. Managing daily email inboxes, coordinating calendars across time zones, and keeping team projects organized and on track.',
  },
  {
    id: 'senior-operations-lead',
    role: 'Operations & Project Assistant',
    company: 'Vanguard Media',
    period: '2021 – 2022',
    description:
      'Supported daily operations and contractor communications. Documented team workflows and led weekly task check-ins in ClickUp and Asana.',
  },
  {
    id: 'executive-admin-lead',
    role: 'Executive Assistant',
    company: 'Horizon Consulting',
    period: '2020 – 2021',
    description:
      'Handled executive scheduling, travel bookings, and meeting preparation. Kept shared team drives and company files organized.',
  },
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 select-none"
    >
      {/* Top Divider matching other sections */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 sm:mb-20 flex items-center justify-end border-b border-neutral-200/90 pb-4 sm:pb-5"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.24em] text-neutral-900 font-bold">
            Experience
          </span>
          <span className="w-2 h-2 rounded-full bg-[#f16738]" />
        </div>
      </motion.div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 sm:mb-18"
      >
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-neutral-900 tracking-tight leading-[1.12]">
          Experience &{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f16738] via-[#ff7847] to-[#e45220]">
              Expertise
            </span>
          </span>
        </h2>
        <p className="mt-4 sm:mt-5 text-neutral-800 font-body text-base sm:text-lg leading-[1.75] max-w-2xl">
          A track record of managing operations, coordinating schedules, and keeping projects on track for high-paced leaders.
        </p>
      </motion.div>

      {/* Vertical Timeline Track & Cards */}
      <div className="relative pl-7 sm:pl-10">
        {/* Vertical Terracotta Timeline Line */}
        <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#f16738] via-[#f16738]/80 to-[#f16738]/20" />

        <div className="space-y-6 sm:space-y-8">
          {EXPERIENCES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group"
            >
              {/* Terracotta Node on Timeline */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-7 w-3.5 h-3.5 rounded-full bg-[#f16738] shadow-[0_0_12px_rgba(241,103,56,0.4)] ring-4 ring-[#faf8f5] z-10 transition-transform duration-300 group-hover:scale-125" />

              {/* Timeline Card */}
              <div className="relative rounded-2xl bg-white border border-neutral-200/90 hover:border-[#f16738]/40 transition-all duration-300 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Terracotta Square Icon */}
                    <div className="w-10 h-10 rounded-xl bg-[#f16738] text-white flex items-center justify-center font-bold shrink-0 shadow-[0_4px_12px_rgba(241,103,56,0.25)]">
                      <Briefcase className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    {/* Job Title & Company */}
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-900 tracking-tight leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-neutral-600 font-body text-xs sm:text-sm mt-0.5">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  {/* Date with Calendar Icon */}
                  <div className="self-start sm:self-center">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 font-medium whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 text-[#f16738]" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>

                {/* Body Paragraph */}
                <p className="text-neutral-700 font-body text-sm leading-relaxed mt-4">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
