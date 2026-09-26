import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock, ArrowRight } from 'lucide-react';
import { BookingFormState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState<BookingFormState>({
    fullName: '',
    workEmail: '',
    startupName: '',
    stage: 'Solo founder',
    primaryNeed: 'Inbox & Calendar Management',
    preferredDate: 'Next 48 Hours',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200/90 shadow-[0_24px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8 z-10 my-8 text-neutral-900 overflow-hidden"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#f16738] via-[#ff7847] to-[#e45220]" />

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
                    Direct Inquiry
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                    Work With Makkie
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1 font-body">
                    Share what operational bottlenecks you need off your plate and let's coordinate next steps.
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
                        placeholder="Alex Chen"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all"
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
                        placeholder="alex@company.com"
                        value={form.workEmail}
                        onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Company or Team
                      </label>
                      <input
                        id="booking-startup-input"
                        type="text"
                        placeholder="e.g. Acme Studio"
                        value={form.startupName}
                        onChange={(e) => setForm({ ...form, startupName: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Team Size
                      </label>
                      <select
                        id="booking-stage-select"
                        value={form.stage}
                        onChange={(e) => setForm({ ...form, stage: e.target.value as any })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all"
                      >
                        <option value="Solo founder">Solo founder</option>
                        <option value="2–5 people">2–5 people</option>
                        <option value="6–20 people">6–20 people</option>
                        <option value="20+ people">20+ people</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Primary Need
                    </label>
                    <select
                      id="booking-need-select"
                      value={form.primaryNeed}
                      onChange={(e) => setForm({ ...form, primaryNeed: e.target.value as any })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all"
                    >
                      <option value="Inbox & Calendar Management">Inbox & Calendar Management</option>
                      <option value="Project & Pipeline Coordination">Project & Pipeline Coordination</option>
                      <option value="Stakeholder & Client Communications">Stakeholder & Client Communications</option>
                      <option value="Systems & Process Building">Systems & Process Building</option>
                      <option value="Operations Support (Multi-Platform)">Operations Support (Multi-Platform)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Brief Context
                    </label>
                    <textarea
                      id="booking-notes-input"
                      rows={2}
                      placeholder="Share current operational challenges, tools you use, or your ideal start date..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-neutral-900 focus:outline-none focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#f16738]" />
                      Makkie replies within 2–4 hours
                    </span>
                    <button
                      id="submit-booking-btn"
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f16738] hover:bg-[#ff7847] text-white px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(241,103,56,0.35)] transition-all cursor-pointer"
                    >
                      <span>Submit Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-heading font-black text-2xl text-neutral-900 mb-2">
                  Request Received!
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{form.fullName || 'friend'}</strong>. Makkie has received your request regarding <strong className="text-neutral-900">{form.primaryNeed}</strong> and will follow up directly at <strong className="text-neutral-900">{form.workEmail}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-1 mb-6 font-mono text-neutral-700">
                  <div>Status: Queued for review</div>
                  <div>Service: {form.primaryNeed}</div>
                  <div>Team: {form.startupName || 'Not specified'}</div>
                </div>
                <button
                  id="dismiss-booking-confirmation-btn"
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
