import React from 'react';
import { ArrowUp, Mail, Calendar, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenBooking?: () => void;
  onContactClick?: () => void;
  onServicesClick?: () => void;
  onAboutClick?: () => void;
  onExperienceClick?: () => void;
  onReviewsClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onContactClick,
  onServicesClick,
  onAboutClick,
  onExperienceClick,
  onReviewsClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#101216] border-t border-neutral-800/90 text-neutral-300 select-none">
      {/* Top Pre-Footer Call to Action Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-neutral-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-gradient-to-br from-[#181a20] to-[#121418] border border-neutral-800 p-8 sm:p-10 rounded-3xl">
          <div className="max-w-xl">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#f16738]">
              Ready to collaborate?
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2 tracking-tight">
              Get your daily operations organized.
            </h3>
            <p className="font-body text-sm text-neutral-400 mt-2 leading-relaxed">
              Book a quick intro call to review your current bottlenecks, or send over a message with what you need off your plate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f16738] hover:bg-[#ff7847] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(241,103,56,0.35)] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 15-Min Intro</span>
              </button>
            )}

            {onContactClick && (
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#20232a] hover:bg-[#282c35] text-neutral-200 hover:text-white font-heading font-bold text-xs uppercase tracking-wider border border-neutral-700/80 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>Send a Note</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f16738] to-[#d84717] flex items-center justify-center text-white text-xs font-black shadow-[0_2px_8px_rgba(241,103,56,0.35)]">
                  M
                </div>
                <span className="text-white font-heading font-extrabold text-lg tracking-wider">
                  MAKKIE
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed max-w-sm">
                Lead Virtual Assistant & Operations Partner. Supporting high-paced founders and executives with reliable inbox management, scheduling, and project execution.
              </p>
            </div>

            <div className="mt-6">
              <a
                href="mailto:hello@makkie.co"
                className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-neutral-300 hover:text-[#f16738] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#f16738]" />
                <span>hello@makkie.co</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-body text-neutral-400">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onAboutClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={onExperienceClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={onReviewsClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Services */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-200 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-body text-neutral-400">
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Virtual Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Administrative Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Appointment Scheduling
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Project Management
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Availability */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-200 mb-4">
                Location
              </h4>
              <p className="font-body text-xs text-neutral-400 leading-relaxed">
                New York, NY (EST)
                <br />
                Mon – Fri: 9am – 6pm
                <br />
                Remote & Global
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80">
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Subtle Credits */}
      <div className="border-t border-neutral-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-neutral-500">
          <div>
            © {currentYear} Makkie. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-600" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors inline-flex items-center gap-1"
            >
              <span>X / Twitter</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-600" />
            </a>
            <button
              onClick={onContactClick}
              className="text-[#f16738] hover:text-[#ff7e50] font-medium transition-colors cursor-pointer"
            >
              Say Hi 👋
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
