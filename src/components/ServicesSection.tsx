import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Calendar, Users, Layers, MonitorSmartphone } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
  onBookCall?: () => void;
}

const SERVICES_DATA = [
  {
    num: '01',
    icon: Mail,
    title: 'Inbox & Calendar Management',
    description:
      'Full management of email correspondence and scheduling; sorting, prioritizing, and responding to emails, coordinating meetings, and keeping your calendar conflict-free.',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Project & Pipeline Coordination',
    description:
      'Setting up and managing project pipelines (e.g., in ClickUp) to track tasks, deadlines, and deliverables across teams and clients, so nothing falls through the cracks.',
  },
  {
    num: '03',
    icon: Users,
    title: 'Stakeholder & Client Communications',
    description:
      'Managing day-to-day communication with clients, collaborators, and internal teams, keeping everyone aligned and informed without things getting lost in the noise.',
  },
  {
    num: '04',
    icon: Calendar,
    title: 'Systems & Process Building',
    description:
      'Designing internal tools like trackers, directories, and reporting templates that turn scattered processes into repeatable systems your business can rely on.',
  },
  {
    num: '05',
    icon: MonitorSmartphone,
    title: 'Operations Support (Multi-Platform)',
    description:
      'Hands-on experience working across ClickUp, Notion, Zapier, HoneyBook, and Discord — bringing structure to however your team already operates, without forcing a platform switch.',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookCall }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative w-full bg-[#faf7f2] py-24 sm:py-32 overflow-hidden select-none border-t border-neutral-200/80"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-14 sm:mb-18"
        >
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight">
            How we work{' '}
            <span className="bg-[#f16738] text-white px-4 py-1.5 rounded-2xl inline-block transform -rotate-2 shadow-sm">
              together
            </span>
          </h2>
        </motion.div>

        {/* Bento grid: row 1 → 2 cards, row 2 → 2 cards, row 3 → 1 full-width card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

          {SERVICES_DATA.slice(0, 4).map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.07 * index, ease }}
                className="group bg-white rounded-[2rem] p-7 sm:p-9 shadow-[0_10px_32px_rgba(0,0,0,0.05)] border border-neutral-200/80 hover:border-[#f16738]/35 hover:shadow-[0_20px_48px_rgba(241,103,56,0.08)] transition-all duration-300 flex flex-col"
              >
                {/* Top row: icon + number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#f16738]/10 flex items-center justify-center group-hover:bg-[#f16738] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#f16738] group-hover:text-white transition-colors duration-300 stroke-[1.8]" />
                  </div>
                  <span className="font-heading font-black text-3xl text-[#f16738]/25 group-hover:text-[#f16738]/50 transition-colors duration-300">
                    {service.num}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-neutral-600 text-sm sm:text-[15px] leading-relaxed flex-1">
                  {service.description}
                </p>
              </motion.div>
            );
          })}

          {/* 5th card — full width, horizontal layout */}
          {(() => {
            const service = SERVICES_DATA[4];
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.35, ease }}
                className="group sm:col-span-2 bg-neutral-900 rounded-[2rem] p-7 sm:p-9 shadow-[0_10px_32px_rgba(0,0,0,0.12)] border border-neutral-800 hover:border-[#f16738]/50 hover:shadow-[0_20px_48px_rgba(241,103,56,0.15)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-7 sm:gap-12"
              >
                {/* Left */}
                <div className="flex items-start gap-5 sm:shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#f16738]/15 flex items-center justify-center group-hover:bg-[#f16738] transition-colors duration-300 shrink-0">
                    <Icon className="w-5 h-5 text-[#f16738] group-hover:text-white transition-colors duration-300 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="font-heading font-black text-3xl text-[#f16738]/30 group-hover:text-[#f16738]/60 transition-colors duration-300 block leading-none mb-2">
                      {service.num}
                    </span>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px self-stretch bg-white/10" />

                {/* Right */}
                <p className="font-body text-neutral-400 text-sm sm:text-[15px] leading-relaxed flex-1">
                  {service.description}
                </p>
              </motion.div>
            );
          })()}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="mt-12 sm:mt-14 text-center"
        >
          <button
            onClick={() => onBookCall?.()}
            className="px-8 py-3.5 rounded-full bg-[#f16738] hover:bg-[#ff7847] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-2"
          >
            <span>Work With Makkie</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
