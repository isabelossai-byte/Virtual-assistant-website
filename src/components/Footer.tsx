import React from 'react';
import { ArrowUp, Mail, Calendar, ArrowUpRight, MessageCircle } from 'lucide-react';

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
    <footer className="w-full bg-[#0A0118] border-t border-white/10 text-neutral-300 select-none">
      {/* Top Pre-Footer Call to Action Banner (Jazz style) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#120826] border border-white/10 p-8 sm:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f16738]/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#f16738]">
              Ready to collaborate?
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-2 tracking-tight">
              Get your daily operations organized.
            </h3>
            <p className="font-body text-sm text-neutral-400 mt-2 leading-relaxed">
              Let's talk about what's slowing your business down — inboxes, calendars, client communications, or pipelines — and get it running smoothly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10">
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f16738] hover:bg-[#ff7847] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(241,103,56,0.35)] cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </button>
            )}

            <a
              href="https://wa.me/2349030241399"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-heading font-bold text-xs uppercase tracking-wider border border-white/15 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Chat</span>
            </a>
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
                <span className="text-white font-heading font-black text-lg tracking-wider">
                  MAKKIE
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed max-w-sm">
                Executive Assistant & Operations Manager based in Lagos, Nigeria. Helping founders and small teams stay organized, on schedule, and stress-free.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href="mailto:makkieisabel@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-neutral-300 hover:text-[#f16738] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#f16738]" />
                <span>makkieisabel@gmail.com</span>
              </a>
              <a
                href="https://wa.me/2349030241399"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-neutral-300 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>+234 903 024 1399</span>
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
                  Experience & Process
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
                  Inbox & Calendar Management
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Project & Pipeline Coordination
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stakeholder Communications
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Systems & Process Building
                </button>
              </li>
              <li>
                <button
                  onClick={onServicesClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Operations Support (Multi-Platform)
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
                Lagos, Nigeria (WAT)
                <br />
                Mon – Fri: 9am – 6pm
                <br />
                Remote & Global Support
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
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
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-neutral-500">
          <div>
            © {currentYear} Chiamaka "Makkie" Ossai. All rights reserved.
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
              href="https://wa.me/2349030241399"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors inline-flex items-center gap-1"
            >
              <span>WhatsApp</span>
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
