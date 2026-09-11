import React from 'react';
import { motion } from 'motion/react';

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
      showOnMobile: true,
    },
    {
      id: 'About',
      label: 'About',
      action: onAboutClick,
      showOnMobile: true,
    },
    {
      id: 'Services',
      label: 'Services',
      action: onServicesClick,
      showOnMobile: true,
    },
    {
      id: 'Experience',
      label: 'Experience',
      action: onExperienceClick,
      showOnMobile: true,
    },
    {
      id: 'Reviews',
      label: 'Reviews',
      action: onReviewsClick,
      showOnMobile: false,
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 w-full px-3 sm:px-6 pt-3.5 sm:pt-5 pb-2.5 z-50 flex justify-center pointer-events-none"
    >
      {/* Floating Dark Glassmorphic Nav Bar */}
      <nav
        id="main-nav-pill"
        className="pointer-events-auto w-full max-w-4xl bg-[#0e1013]/92 backdrop-blur-2xl text-white px-3 sm:px-4 py-2 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.08)_inset] border border-neutral-800/90 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300"
      >
        {/* 1. Left: Brand Mark & Monogram */}
        <button
          id="nav-brand-logo"
          onClick={() => {
            handleNavClick('Home', () => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
          }}
          className="flex items-center gap-2 sm:gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-white/[0.04] transition-colors cursor-pointer group flex-shrink-0"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#f16738] via-[#e5592a] to-[#c94519] flex items-center justify-center text-white font-extrabold text-xs sm:text-sm shadow-[0_2px_10px_rgba(241,103,56,0.35)] group-hover:scale-105 transition-transform duration-200">
            <span className="font-heading font-black tracking-tight text-[11px] sm:text-xs">
              M
            </span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/30 pointer-events-none" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xs sm:text-sm tracking-[0.16em] text-white uppercase group-hover:text-[#ff8255] transition-colors">
                MAKKIE
              </span>
            </div>
            <span className="hidden md:block text-[9px] font-mono uppercase tracking-wider text-neutral-400 -mt-0.5">
              Behind-The-Scenes CEO
            </span>
          </div>
        </button>

        {/* 2. Center: Sequence of Navigation Items */}
        <div
          id="nav-sequential-links"
          className="flex items-center gap-0.5 sm:gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.05]"
        >
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id.toLowerCase()}-btn`}
                onClick={() => handleNavClick(item.id, item.action)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
                  !item.showOnMobile ? 'hidden md:inline-flex' : 'inline-flex'
                } ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {/* Animated sliding background pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute inset-0 bg-[#f16738] rounded-full shadow-[0_2px_12px_rgba(241,103,56,0.38)] -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Right: High-Impact "Say Hi 👋" CTA Button */}
        <div className="flex items-center flex-shrink-0">
          <button
            id="nav-contact-btn"
            onClick={onHireMe}
            className="group relative px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full font-heading font-semibold text-xs sm:text-[13px] text-white bg-gradient-to-r from-[#f16738] via-[#f27448] to-[#e05220] hover:from-[#f37c52] hover:to-[#ea5c2b] shadow-[0_3px_14px_rgba(241,103,56,0.35),0_1px_0_rgba(255,255,255,0.25)_inset] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            <span>Say Hi</span>
            <span className="inline-block transform group-hover:rotate-12 transition-transform duration-200 text-sm">
              👋
            </span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

