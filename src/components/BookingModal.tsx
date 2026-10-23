import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, MessageCircle, ExternalLink, RotateCcw, Copy } from 'lucide-react';
import { InquiryFormState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES_OPTIONS = [
  'Inbox & Calendar Management',
  'Project & Pipeline Coordination',
  'Stakeholder & Client Communications',
  'Systems & Process Building (ClickUp, Notion, Zapier)',
  'Operations Support (Multi-Platform)',
  'Other / Custom Scope',
];

const BUDGET_OPTIONS = [
  '< $1,000 / mo',
  '$1,000 – $2,500 / mo',
  '$2,500 – $5,000 / mo',
  '$5,000+ / mo',
  'Flexible / Open to discuss',
];

const TIMELINE_OPTIONS = [
  'Immediately (ASAP)',
  'Within 1–2 weeks',
  'Within 1 month',
  'Flexible / Exploring',
];

const WHATSAPP_NUMBER = '2348187928302';
const WHATSAPP_DISPLAY = '+234 818 792 8302';

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');
  const [generatedMessageText, setGeneratedMessageText] = useState('');

  const [form, setForm] = useState<InquiryFormState>({
    fullName: '',
    email: '',
    phone: '',
    service: 'Inbox & Calendar Management',
    description: '',
    budget: '$1,000 – $2,500 / mo',
    timeline: 'Immediately (ASAP)',
    notes: '',
  });

  const buildWhatsAppMessage = () => {
    const lines = [
      `*✨ New Client Inquiry for Makkie*`,
      ``,
      `*👤 Client Name:* ${form.fullName.trim()}`,
      `*✉️ Email:* ${form.email.trim()}`,
      `*📱 Phone / WhatsApp:* ${form.phone.trim() || 'Not specified'}`,
      `*💼 Service Interested In:* ${form.service}`,
      `*💰 Budget Range:* ${form.budget}`,
      `*⏱️ Preferred Timeline:* ${form.timeline}`,
      ``,
      `*📋 Brief Description of Need:*`,
      `${form.description.trim()}`,
    ];

    if (form.notes.trim()) {
      lines.push(``, `*📝 Anything Else to Mention:*`, `${form.notes.trim()}`);
    }

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.description.trim()) return;

    const messageText = buildWhatsAppMessage();
    const encodedText = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    setGeneratedMessageText(messageText);
    setGeneratedWhatsAppUrl(waUrl);

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
  };

  const handleCopyMessage = () => {
    if (!generatedMessageText) return;
    navigator.clipboard.writeText(generatedMessageText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setForm({
      fullName: '',
      email: '',
      phone: '',
      service: 'Inbox & Calendar Management',
      description: '',
      budget: '$1,000 – $2,500 / mo',
      timeline: 'Immediately (ASAP)',
      notes: '',
    });
    setGeneratedWhatsAppUrl('');
    setGeneratedMessageText('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0118]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white rounded-3xl border border-neutral-200/90 shadow-[0_24px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8 z-10 my-8 text-neutral-900 max-h-[90vh] overflow-y-auto"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#f16738] via-[#25D366] to-[#f16738]" />

            {/* Close button */}
            <button
              id="close-booking-modal-btn"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f16738] font-bold block mb-1">
                    Project Inquiry
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                    Work With Makkie
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-body">
                    Complete your brief below. It will open in WhatsApp formatted so Makkie has all details before responding.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm font-body">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="booking-name-input"
                        type="text"
                        required
                        placeholder="e.g. Steve Ortiz"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="booking-email-input"
                        type="email"
                        required
                        placeholder="steve@studio.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number (Optional)
                    </label>
                    <input
                      id="booking-phone-input"
                      type="tel"
                      placeholder="e.g. +1 555 123 4567 or +234..."
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Service Interested In *
                    </label>
                    <select
                      id="booking-service-select"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all text-sm cursor-pointer"
                    >
                      {SERVICES_OPTIONS.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Brief Description of What You Need *
                    </label>
                    <textarea
                      id="booking-description-input"
                      required
                      rows={3}
                      placeholder="Describe your operational bottlenecks, recurring tasks, or what you need organized..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all resize-none text-sm leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Budget Range
                      </label>
                      <select
                        id="booking-budget-select"
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all text-xs sm:text-sm cursor-pointer"
                      >
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Preferred Timeline
                      </label>
                      <select
                        id="booking-timeline-select"
                        value={form.timeline}
                        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all text-xs sm:text-sm cursor-pointer"
                      >
                        {TIMELINE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Anything Else to Mention? (Optional)
                    </label>
                    <input
                      id="booking-notes-input"
                      type="text"
                      placeholder="Tools (Notion, Zapier, ClickUp), timezones, or questions..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all text-sm"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      id="submit-booking-btn"
                      type="submit"
                      disabled={!form.fullName.trim() || !form.email.trim() || !form.description.trim()}
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] disabled:bg-neutral-300 text-white px-6 py-3.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(37,211,102,0.35)] disabled:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Send Inquiry via WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-neutral-400 text-center mt-2 font-body">
                      Sends directly to Makkie's WhatsApp ({WHATSAPP_DISPLAY})
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-heading font-black text-2xl text-neutral-900 mb-1">
                  Inquiry Dispatched to WhatsApp!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mb-5 leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{form.fullName}</strong>. Your inquiry has been formatted. If WhatsApp did not open automatically, tap below to open the chat directly:
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5 justify-center mb-5">
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Open in WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                  </a>

                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-3 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Brief</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs font-mono text-neutral-700 whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto mb-5">
                  {generatedMessageText}
                </div>

                <button
                  id="dismiss-booking-confirmation-btn"
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Done</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
