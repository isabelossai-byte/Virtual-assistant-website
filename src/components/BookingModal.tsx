import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calendar, Clock, ArrowRight } from 'lucide-react';
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
    stage: 'Seed',
    primaryNeed: '0-to-1 MVP',
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
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#fcfbf9] border border-[#e2ded6] shadow-2xl p-6 sm:p-8 z-10 my-8 text-neutral-900"
          >
            {/* Close button */}
            <button
              id="close-booking-modal-btn"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#f16738] block mb-1">
                    Behind-The-Scenes CEO
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900">
                    Say Hi to Makkie 👋
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1 font-body">
                    You run the vision. Makkie runs everything else. Let's fix the inbox & ops chaos.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-sans-clean text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        id="booking-name-input"
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full bg-white border border-[#d6d2c8] px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wider mb-1">
                        Work Email
                      </label>
                      <input
                        id="booking-email-input"
                        type="email"
                        required
                        placeholder="alex@startup.com"
                        value={form.workEmail}
                        onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                        className="w-full bg-white border border-[#d6d2c8] px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wider mb-1">
                        Startup Name
                      </label>
                      <input
                        id="booking-startup-input"
                        type="text"
                        required
                        placeholder="Caelum AI"
                        value={form.startupName}
                        onChange={(e) => setForm({ ...form, startupName: e.target.value })}
                        className="w-full bg-white border border-[#d6d2c8] px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wider mb-1">
                        Funding Stage
                      </label>
                      <select
                        id="booking-stage-select"
                        value={form.stage}
                        onChange={(e) => setForm({ ...form, stage: e.target.value as any })}
                        className="w-full bg-white border border-[#d6d2c8] px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                      >
                        <option value="Idea / Pre-seed">Idea / Pre-seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Bootstrapped">Bootstrapped</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wider mb-1">
                      Primary Need
                    </label>
                    <select
                      id="booking-need-select"
                      value={form.primaryNeed}
                      onChange={(e) => setForm({ ...form, primaryNeed: e.target.value as any })}
                      className="w-full bg-white border border-[#d6d2c8] px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                    >
                      <option value="0-to-1 MVP">0-to-1 MVP Build & Launch</option>
                      <option value="Fundraising Pitch & Demo">Fundraising Pitch Deck & Interactive Demo</option>
                      <option value="Design System">Design System & Team Foundations</option>
                      <option value="Growth Redesign">Conversion & User Retention Redesign</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wider mb-1">
                      Target Timeline / Project Context
                    </label>
                    <textarea
                      id="booking-notes-input"
                      rows={2}
                      placeholder="Brief note on what you are building and target launch date..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full bg-white border border-[#d6d2c8] px-3.5 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Makkie responds within 12 hours
                    </span>
                    <button
                      id="submit-booking-btn"
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#151515] text-[#faf8f5] hover:bg-[#282828] px-6 py-3 text-sm font-medium font-sans-clean transition-colors cursor-pointer"
                    >
                      Request Call
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-[#e05928]/10 text-[#e05928] mx-auto flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-editorial italic text-2xl text-neutral-900 mb-2">
                  Call invitation requested
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 font-sans-clean leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{form.fullName || 'founder'}</strong>. A calendar invite and prep link for <strong className="text-neutral-900">{form.startupName || 'your startup'}</strong> has been routed to <strong className="text-neutral-900">{form.workEmail || 'your email'}</strong>.
                </p>
                <div className="p-4 bg-neutral-100/70 border border-[#e4e0d7] text-left text-xs space-y-1 mb-6 font-mono text-neutral-700">
                  <div>Status: Confirmed priority queue</div>
                  <div>Focus: {form.primaryNeed}</div>
                  <div>Stage: {form.stage}</div>
                </div>
                <button
                  id="dismiss-booking-confirmation-btn"
                  onClick={handleReset}
                  className="bg-[#151515] text-[#faf8f5] px-6 py-2.5 text-sm font-medium font-sans-clean hover:bg-[#282828] transition-colors cursor-pointer"
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
