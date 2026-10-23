import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface MinimalHeaderProps {
  onHireMe: () => void;
  onServicesClick: () => void;
  onAboutClick?: () => void;
  onExperienceClick?: () => void;
  onReviewsClick?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  onHireMe,
  onServicesClick,
  onAboutClick,
  onExperienceClick,
  onReviewsClick,
  activeTab = 'Home',
  setActiveTab,
}) => {
  const handleNavClick = (tabId: string, action?: () => void) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    if (action) {
      action();
    }
  };

  const navLinks = [
    {
      id: 'Home',
      label: 'Home',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      visibility: 'inline-flex',
    },
    {
      id: 'About',
      label: 'About',
      action: onAboutClick,
      visibility: 'inline-flex',
    },
    {
      id: 'Services',
      label: 'Services',
      action: onServicesClick,
      visibility: 'inline-flex',
    },
    {
      id: 'Experience',
      label: 'Experience',
      action: onExperienceClick,
      visibility: 'hidden sm:inline-flex',
    },
    {
      id: 'Reviews',
      label: 'Reviews',
      action: onReviewsClick,
      visibility: 'hidden md:inline-flex',
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 w-full z-50 bg-[#0A0118]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">

        {/* 1. Left: Brand Mark */}
        <button
          id="nav-brand-logo"
          onClick={() => {
            handleNavClick('Home', () => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
          }}
          className="flex items-center gap-2.5 sm:gap-3 py-1 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer group flex-shrink-0 touch-manipulation"
        >
          {/* Crisp Monogram */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f16738] to-[#d64a1c] flex items-center justify-center text-white font-heading font-black text-xs tracking-tight shadow-[0_2px_10px_rgba(241,103,56,0.35)]">
            M
          </div>

          <div className="flex flex-col text-left">
            <span className="font-heading font-black text-xs sm:text-sm tracking-[0.16em] text-white uppercase group-hover:text-[#f16738] transition-colors">
              MAKKIE
            </span>
            <span className="hidden md:block text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium -mt-0.5">
              Operations Specialist
            </span>
          </div>
        </button>

        {/* 2. Center: Premium Navigation Links */}
        <div
          id="nav-sequential-links"
          className="flex items-center gap-0.5 bg-white/[0.05] p-1 rounded-full border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id.toLowerCase()}-btn`}
                onClick={() => handleNavClick(item.id, item.action)}
                className={`relative px-2.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none touch-manipulation ${item.visibility} ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute inset-0 rounded-full -z-10 bg-gradient-to-b from-[#f97c4a] to-[#d95120] shadow-[0_2px_14px_rgba(241,103,56,0.55),inset_0_1px_0_rgba(255,255,255,0.22)]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Right: High-Impact "Contact Me" CTA Button */}
        <div className="flex items-center flex-shrink-0">
          <button
            id="nav-contact-btn"
            onClick={onHireMe}
            className="group relative px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#f16738] hover:bg-[#ff7847] shadow-[0_3px_12px_rgba(241,103,56,0.35)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-1 sm:gap-1.5 touch-manipulation"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </motion.header>
  );
};
