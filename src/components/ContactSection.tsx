import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageCircle,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking?: () => void;
}

const SERVICES_OPTIONS = [
  'Inbox & Calendar Management',
  'Project & Pipeline Coordination',
  'Stakeholder & Client Communications',
  'Systems & Process Building',
  'Operations Support (Multi-Platform)',
  'Other / Custom Scope',
];

const SCOPE_OPTIONS = ['< 10 hrs / week', '10–20 hrs / week', '20+ hrs / week'];

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Inbox & Calendar Management',
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
    navigator.clipboard.writeText('makkieisabel@gmail.com');
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
      className="relative w-full bg-[#faf8f5] py-24 sm:py-32 overflow-hidden select-none border-t border-neutral-200/80"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline (Clean minimal typography, no pill heading) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-neutral-900 tracking-tight leading-[1.15]">
            Let's talk about what you need{' '}
            <span className="text-[#f16738]">
              off your plate.
            </span>
          </h2>
          <p className="mt-4 text-neutral-600 font-body text-base sm:text-lg leading-relaxed">
            Whether you need daily executive support, ClickUp workspace organization, or recurring operations management — reach out and let's get you organized.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Dark Direct Contact Info Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl bg-[#0A0118] text-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#f16738]/10 blur-[60px] rounded-full pointer-events-none" />

              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f16738] font-bold block mb-3">
                Direct Communication
              </span>

              <h3 className="font-heading font-black text-2xl text-white tracking-tight">
                Connect directly with Makkie
              </h3>

              <p className="font-body text-neutral-300 text-sm mt-3 leading-relaxed">
                Skip the friction. Send an email, initiate a quick WhatsApp chat, or use the project brief form.
              </p>

              {/* Email Address with Copy Button */}
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Email Address
                </span>
                <div className="font-heading font-bold text-base sm:text-lg text-white break-all">
                  makkieisabel@gmail.com
                </div>

                <button
                  onClick={handleCopyEmail}
                  className={`mt-3 w-full py-2.5 px-4 rounded-xl border font-heading font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/[0.08] hover:bg-white/[0.14] border-white/10 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-300" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Direct Chat Button */}
              <a
                href="https://wa.me/2349030241399"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+234 903 024 1399)</span>
              </a>

              {/* Details strip */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs font-body text-neutral-400">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#f16738]" />
                  <span>Typical response time: Under 2–4 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f16738]" />
                  <span>Based in Lagos, Nigeria (WAT / GMT+1) · Available Globally</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-neutral-200/90 p-7 sm:p-10 shadow-[0_16px_45px_rgba(0,0,0,0.04)]">
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
                    <h3 className="font-heading font-black text-2xl text-neutral-900">
                      Message Received!
                    </h3>
                    <p className="mt-2 text-neutral-600 font-body text-sm max-w-md leading-relaxed">
                      Thanks <strong className="text-neutral-900">{name}</strong>. Makkie has received your inquiry and will reply directly to <strong className="text-neutral-900">{email}</strong> shortly.
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
                    {/* Services Chips */}
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-2.5">
                        1. What services do you need support with?
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

                    {/* Scope Pills */}
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-2.5">
                        2. Estimated weekly commitment
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

                    {/* Form Inputs */}
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
                          placeholder="e.g. Steve Lucin"
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
                          placeholder="steve@company.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Company or Team (Optional)
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Halucinated Studios"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Share your current bottlenecks or scope
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell Makkie about your current operational challenges, tools you use, or your ideal start date..."
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
                            <span>Send Inquiry</span>
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
      </div>
    </section>
  );
};
