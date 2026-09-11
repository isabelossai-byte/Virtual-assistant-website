import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Copy,
  Check,
  Calendar,
  Send,
  ArrowUpRight,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking?: () => void;
}

const SERVICES_OPTIONS = [
  'Virtual Assistance',
  'Administrative Support',
  'Appointment Scheduling',
  'Project Management',
  'Other / Custom',
];

const SCOPE_OPTIONS = ['< 10 hrs / week', '10–20 hrs / week', '20+ hrs / week'];

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Virtual Assistance',
  ]);
  const [selectedScope, setSelectedScope] = useState<string>('10–20 hrs / week');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@makkie.co');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact-section"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 select-none"
    >
      {/* Top Divider matching other sections */}
      <div className="mb-14 sm:mb-20 flex items-center justify-end border-b border-neutral-200/90 pb-4 sm:pb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-[13px] font-heading font-bold uppercase tracking-[0.24em] text-neutral-900">
            Get in Touch
          </span>
          <span className="w-2 h-2 rounded-full bg-[#f16738]" />
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-14 sm:mb-18 max-w-3xl">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-neutral-900 tracking-tight leading-[1.12]">
          Let's talk about what you need{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f16738] via-[#ff7847] to-[#e45220]">
              off your plate.
            </span>
          </span>
        </h2>
        <p className="mt-4 sm:mt-5 text-neutral-800 font-body text-base sm:text-lg leading-[1.75] max-w-2xl">
          Whether you need daily inbox triage, calendar coordination, or structured project management, send a message or book a quick 15-minute intro call.
        </p>
      </div>

      {/* Two-Column Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ================= LEFT COLUMN: CONTACT DETAILS ================= */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Direct Email Card with One-Click Copy */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-7 sm:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.03)]">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#f16738]">
              Direct Inquiries
            </span>
            <div className="mt-2 font-heading font-extrabold text-2xl text-neutral-900 tracking-tight">
              hello@makkie.co
            </div>
            <p className="text-sm text-neutral-600 font-body mt-2 leading-relaxed">
              Prefer writing an email directly from your inbox? Copy the address below:
            </p>

            <button
              onClick={handleCopyEmail}
              className={`mt-5 w-full py-3 px-4 rounded-xl border font-heading font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isCopied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Copy email address</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Schedule Call Card */}
          {onOpenBooking && (
            <div className="rounded-3xl bg-gradient-to-br from-[#1b1e24] to-[#121418] text-white p-7 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.1)] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#f16738] uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Skip the back-and-forth</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white mt-3 tracking-tight">
                  Book a 15-Minute Intro Call
                </h3>
                <p className="text-sm text-neutral-400 font-body mt-2 leading-relaxed">
                  Choose a time directly on my calendar to discuss your requirements and how I can help.
                </p>
              </div>

              <button
                onClick={onOpenBooking}
                className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-[#f16738] hover:bg-[#ff7847] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(241,103,56,0.35)] cursor-pointer"
              >
                <span>Select a Time</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE FORM ================= */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-7 sm:p-9 shadow-[0_16px_45px_rgba(0,0,0,0.04)]">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-neutral-900">
                    Message Received!
                  </h3>
                  <p className="mt-2 text-neutral-600 font-body text-sm max-w-md leading-relaxed">
                    Thanks <span className="font-semibold text-neutral-900">{name}</span>. I've received your note and will reply directly to <span className="font-semibold text-neutral-900">{email}</span> within 2–4 business hours.
                  </p>

                  <button
                    onClick={handleResetForm}
                    className="mt-8 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Interactive Service Interest Selection */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-2.5">
                      1. What services do you need help with?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_OPTIONS.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#f16738] text-white shadow-xs'
                                : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                            }`}
                          >
                            {isSelected && <span className="mr-1.5 font-bold">✓</span>}
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Scope / Hours Selection */}
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-2.5">
                      2. Estimated weekly support needed
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {SCOPE_OPTIONS.map((scope) => {
                        const isSelected = selectedScope === scope;
                        return (
                          <button
                            type="button"
                            key={scope}
                            onClick={() => setSelectedScope(scope)}
                            className={`py-2.5 px-2 text-center rounded-xl text-xs font-heading font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#f16738]/10 border-[#f16738] text-[#f16738] font-bold'
                                : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                            }`}
                          >
                            {scope}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Chen"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Health, Studio XYZ"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700">
                        Tell me about your requirements
                      </label>
                      <span className="text-xs font-body text-neutral-400">
                        {message.length} / 500
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      maxLength={500}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share what tasks you are looking to delegate, current bottlenecks, or your ideal starting timeline..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !email}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#f16738] hover:bg-[#ff7847] disabled:bg-neutral-300 text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(241,103,56,0.3)] disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
