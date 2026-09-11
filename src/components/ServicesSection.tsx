import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
  onBookCall?: () => void;
}

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  features: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'virtual-assistance',
    num: '01',
    title: 'Virtual Assistance',
    description:
      'Daily inbox management, meeting updates, email drafts, and following up on important tasks so you can focus on your core work.',
    features: [
      'Daily inbox management',
      'Email and message drafting',
      'Meeting preparation notes',
      'Task reminders and follow-ups',
    ],
  },
  {
    id: 'administrative-assistance',
    num: '02',
    title: 'Administrative Assistance',
    description:
      'General back-office organization. Managing invoices and receipts, coordinating with vendors, and keeping company files tidy.',
    features: [
      'Invoice and expense records',
      'Vendor coordination',
      'File and Google Drive organization',
      'Process documentation',
    ],
  },
  {
    id: 'appointment-scheduling',
    num: '03',
    title: 'Appointment Scheduling',
    description:
      'Handling calendar invites across multiple time zones, protecting your focus time, and confirming meeting details.',
    features: [
      'Multi-timezone scheduling',
      'Meeting confirmations and reminders',
      'Focus time protection',
      'Travel and itinerary arrangements',
    ],
  },
  {
    id: 'project-management',
    num: '04',
    title: 'Project Management',
    description:
      'Organizing team tasks and deadlines in ClickUp, Asana, or Notion. Setting up boards, tracking progress, and keeping everyone aligned.',
    features: [
      'Task boards in ClickUp, Asana & Notion',
      'Weekly progress check-ins',
      'Deadline and milestone tracking',
      'Clear task assignments',
    ],
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onBookCall,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('virtual-assistance');

  const activeService =
    SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0];

  const handleBook = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    } else if (onBookCall) {
      onBookCall();
    }
  };

  return (
    <section
      id="services-section"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 select-none"
    >
      {/* Top Divider matching other sections */}
      <div className="mb-14 sm:mb-20 flex items-center justify-end border-b border-neutral-200/90 pb-4 sm:pb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.24em] text-neutral-900 font-bold">
            Services
          </span>
          <span className="w-2 h-2 rounded-full bg-[#f16738]" />
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-14 sm:mb-18 max-w-3xl">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-neutral-900 tracking-tight leading-[1.12]">
          How I Can{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f16738] via-[#ff7847] to-[#e45220]">
              Help You
            </span>
          </span>
        </h2>

        <p className="mt-4 sm:mt-5 text-neutral-800 font-body text-base sm:text-lg leading-[1.75] max-w-2xl">
          Reliable administrative and operational support to keep your daily work organized and moving forward smoothly.
        </p>
      </div>

      {/* Two-Column Layout: Left Featured Spotlight Card + Right Interactive List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ================= LEFT COLUMN: SPOTLIGHT CARD ================= */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl bg-white border border-neutral-200/90 p-7 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between min-h-[420px]"
          >
            {/* Ambient warm glow in corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#f16738]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top row with clean numeral */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#f16738]">
                {activeService.num}
              </span>
            </div>

            {/* Card Body */}
            <div className="relative z-10 my-auto py-5">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                {activeService.title}
              </h3>

              <p className="mt-3 text-neutral-700 font-body text-sm sm:text-[15px] leading-relaxed">
                {activeService.description}
              </p>

              {/* Checklist Items */}
              <div className="mt-6 space-y-2.5">
                {activeService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#f16738] shrink-0" />
                    <span className="text-xs sm:text-sm text-neutral-800 font-body">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Bottom: Clean Call to Action Button */}
            <div className="relative z-10 pt-5 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => handleBook(activeService.title)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f16738] hover:bg-[#ff7847] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(241,103,56,0.25)] cursor-pointer"
              >
                <span>Book Session</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE LIST ================= */}
        <div className="lg:col-span-7 w-full flex flex-col divide-y divide-neutral-200/90">
          {SERVICES_DATA.map((service) => {
            const isActive = service.id === activeServiceId;

            return (
              <div
                key={service.id}
                id={`service-row-${service.id}`}
                className="py-5 sm:py-6 transition-colors"
              >
                {/* Header Row */}
                <div
                  onClick={() => setActiveServiceId(service.id)}
                  className="flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-base font-bold transition-colors ${
                        isActive ? 'text-[#f16738]' : 'text-neutral-400 group-hover:text-neutral-600'
                      }`}
                    >
                      {service.num}
                    </span>

                    <h3
                      className={`font-heading font-bold text-xl sm:text-2xl tracking-tight transition-colors ${
                        isActive ? 'text-neutral-900' : 'text-neutral-700 group-hover:text-neutral-900'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Right Icon Button */}
                  <div className="shrink-0">
                    {isActive ? (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f16738] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(241,103,56,0.3)]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 text-neutral-500 group-hover:text-neutral-900 group-hover:border-neutral-400 flex items-center justify-center transition-all shadow-2xs">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Content when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pl-9 sm:pl-12">
                        <p className="text-neutral-700 font-body text-sm leading-relaxed max-w-xl">
                          {service.description}
                        </p>

                        {/* 2-column checklist grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                          {service.features.map((item, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#f16738] shrink-0" />
                              <span className="text-xs sm:text-[13px] text-neutral-800 font-body">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Text Link Call to Action */}
                        <div className="mt-5">
                          <button
                            onClick={() => handleBook(service.title)}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#f16738] hover:text-[#d84717] hover:underline cursor-pointer"
                          >
                            <span>Book {service.title}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
