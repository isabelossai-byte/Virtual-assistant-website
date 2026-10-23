import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageCircle,
  ExternalLink,
  RotateCcw,
  ArrowUpRight,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking?: () => void;
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

// ── Sanitization: strip HTML tags, scripts, and control chars ──────────────
const sanitize = (raw: string): string =>
  raw
    .replace(/<[^>]*>/g, '')           // strip any HTML tags
    .replace(/[\x00-\x08\x0B\x0E-\x1F\x7F]/g, '') // strip control chars
    .replace(/javascript\s*:/gi, '')   // strip JS URIs
    .replace(/on\w+\s*=/gi, '')        // strip event handlers
    .trim();

// ── Validators ─────────────────────────────────────────────────────────────
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[\d\s+\-().]{7,20}$/;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  notes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking: _onOpenBooking }) => {
  const [selectedService, setSelectedService] = useState<string>('Inbox & Calendar Management');
  const [selectedBudget, setSelectedBudget] = useState<string>('$1,000 – $2,500 / mo');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Immediately (ASAP)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({}); 

  const [isCopiedMessage, setIsCopiedMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');
  const [generatedMessageText, setGeneratedMessageText] = useState('');

  // ── Field-level validation ──────────────────────────────────────────────
  const validateField = (field: string, value: string): string | undefined => {
    const v = sanitize(value);
    switch (field) {
      case 'name':
        if (!v) return 'Name is required.';
        if (v.length < 2) return 'Name must be at least 2 characters.';
        if (v.length > 80) return 'Name must be under 80 characters.';
        if (/[<>"'`]/.test(value)) return 'Name contains invalid characters.';
        break;
      case 'email':
        if (!v) return 'Email is required.';
        if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
        if (v.length > 120) return 'Email is too long.';
        break;
      case 'phone':
        if (v && !PHONE_RE.test(v)) return 'Enter a valid phone number (digits, spaces, +, -, () only).';
        if (v.length > 20) return 'Phone number is too long.';
        break;
      case 'description':
        if (!v) return 'Please describe what you need.';
        if (v.length < 10) return 'Please provide at least 10 characters.';
        if (v.length > 2000) return 'Description must be under 2000 characters.';
        break;
      case 'notes':
        if (v.length > 500) return 'Additional notes must be under 500 characters.';
        break;
    }
    return undefined;
  };

  const validateAll = (): FormErrors => ({
    name: validateField('name', name),
    email: validateField('email', email),
    phone: validateField('phone', phone),
    description: validateField('description', description),
    notes: validateField('notes', notes),
  });

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldValues: Record<string, string> = { name, email, phone, description, notes };
    const err = validateField(field, fieldValues[field] ?? '');
    setErrors((prev) => ({ ...prev, [field]: err }));
  };


  const handleCopyMessage = () => {
    if (!generatedMessageText) return;
    navigator.clipboard.writeText(generatedMessageText);
    setIsCopiedMessage(true);
    setTimeout(() => setIsCopiedMessage(false), 2500);
  };

  const buildWhatsAppMessage = () => {
    // Sanitize all user inputs before embedding in the message
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);
    const safeDescription = sanitize(description);
    const safeNotes = sanitize(notes);
    const lines = [
      `*✨ New Project Inquiry for Makkie*`,
      ``,
      `*👤 Client Name:* ${safeName}`,
      `*✉️ Email:* ${safeEmail}`,
      `*📱 Phone / WhatsApp:* ${safePhone || 'Not specified'}`,
      `*💼 Service Interested In:* ${selectedService}`,
      `*💰 Budget Range:* ${selectedBudget}`,
      `*⏱️ Preferred Timeline:* ${selectedTimeline}`,
      ``,
      `*📋 Brief Description of Need:*`,
      `${safeDescription}`,
    ];

    if (safeNotes) {
      lines.push(``, `*📝 Anything Else to Mention:*`, `${safeNotes}`);
    }

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields on submit
    const allErrors = validateAll();
    const hasErrors = Object.values(allErrors).some(Boolean);
    if (hasErrors) {
      setErrors(allErrors);
      setTouched({ name: true, email: true, phone: true, description: true, notes: true });
      return;
    }

    setIsSubmitting(true);

    const messageText = buildWhatsAppMessage();
    const encodedText = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    setGeneratedMessageText(messageText);
    setGeneratedWhatsAppUrl(waUrl);

    // Open WhatsApp in a new tab/window
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDescription('');
    setNotes('');
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setGeneratedWhatsAppUrl('');
    setGeneratedMessageText('');
  };

  // Helper to render inline field errors
  const FieldError = ({ field }: { field: keyof FormErrors }) =>
    touched[field] && errors[field] ? (
      <p className="mt-1 text-[11px] text-red-500 font-body flex items-center gap-1">
        <span>⚠</span> {errors[field]}
      </p>
    ) : null;


  return (
    <section
      id="contact-section"
      className="relative w-full bg-[#faf8f5] py-24 sm:py-32 overflow-hidden select-none border-t border-neutral-200/80"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-neutral-900 tracking-tight leading-[1.15]">
            Let's talk about what you need{' '}
            <span className="text-[#f16738]">
              off your plate.
            </span>
          </h2>
          <p className="mt-4 text-neutral-600 font-body text-base sm:text-lg leading-relaxed">
            Fill out the inquiry brief below. It sends directly to Makkie on WhatsApp so she has all the context to review your scope and get in touch promptly.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Dark Direct Contact Info Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl bg-gradient-to-b from-[#140628] via-[#0c031c] to-[#070110] text-white p-7 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.35)] border border-white/10 relative overflow-hidden">
              {/* Ambient backlight glow */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#f16738]/15 blur-[70px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#25D366]/10 blur-[60px] rounded-full pointer-events-none" />

              {/* Top status bar */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f16738] font-bold">
                  Direct Channel
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-heading font-medium text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available Now
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-[1.7rem] text-white tracking-tight leading-tight">
                Connect directly with Makkie
              </h3>

              <p className="font-body text-neutral-300 text-xs sm:text-sm mt-2.5 leading-relaxed">
                Prefer an immediate conversation? Click below to send an email via Outlook, Gmail, or start a live chat on WhatsApp.
              </p>

              {/* Interactive Direct Communication Cards */}
              <div className="mt-6 space-y-3.5">
                
                {/* 1. PRIMARY EMAIL CARD (Click to compose directly) */}
                <div className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#f16738]/50 transition-all duration-300 p-4 sm:p-4.5 group">
                  <a
                    href="mailto:makkieisabel@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Makkie&body=Hi%20Makkie%2C%0A%0AI'd%20like%20to%20discuss%20an%20opportunity%20or%20project%20with%20you..."
                    className="flex items-center justify-between gap-3"
                    title="Click to compose email in your default mail app (Outlook, Mail, etc.)"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f16738]/20 to-[#f16738]/5 border border-[#f16738]/30 flex items-center justify-center text-[#f16738] group-hover:scale-105 group-hover:border-[#f16738]/60 transition-all shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                          Direct Email · Click to Compose
                        </span>
                        <span className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#f16738] transition-colors truncate block">
                          makkieisabel@gmail.com
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#f16738] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </a>

                  {/* Quick web client dispatch links (Gmail & Outlook) */}
                  <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-400 font-body">
                      Open with:
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=makkieisabel@gmail.com&su=Project%20Inquiry%20%E2%80%94%20Makkie"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-[11px] font-heading font-medium text-neutral-200 hover:text-white transition-all flex items-center gap-1.5"
                        title="Compose email directly in Gmail web"
                      >
                        <span>Gmail</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                      <a
                        href="https://outlook.live.com/mail/0/deeplink/compose?to=makkieisabel@gmail.com&subject=Project%20Inquiry%20%E2%80%94%20Makkie"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-[11px] font-heading font-medium text-neutral-200 hover:text-white transition-all flex items-center gap-1.5"
                        title="Compose email directly in Outlook web"
                      >
                        <span>Outlook</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. WHATSAPP DIRECT CHAT CARD */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-gradient-to-r from-[#25D366]/15 via-[#25D366]/10 to-transparent hover:from-[#25D366]/25 hover:via-[#25D366]/15 border border-[#25D366]/30 hover:border-[#25D366]/60 transition-all duration-300 p-4 sm:p-4.5 group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:scale-105 group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#25D366] block font-bold">
                          WhatsApp Direct
                        </span>
                        <span className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#25D366] transition-colors truncate block">
                          {WHATSAPP_DISPLAY}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                  <span className="text-[11px] text-neutral-400 font-body block mt-2">
                    Direct instant messaging via WhatsApp
                  </span>
                </a>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-neutral-200/90 p-7 sm:p-10 shadow-[0_16px_45px_rgba(0,0,0,0.04)]">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-6 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-xs">
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </div>

                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#25D366] font-bold block mb-1">
                      Inquiry Ready
                    </span>

                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                      Message Prepped for WhatsApp!
                    </h3>
                    
                    <p className="mt-3 text-neutral-600 font-body text-sm max-w-md leading-relaxed">
                      Thank you, <strong className="text-neutral-900">{name}</strong>. Your project brief has been formatted. If WhatsApp didn't open automatically in your browser, tap the button below to send your details directly to Makkie.
                    </p>

                    {/* Primary WhatsApp Action */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                      <a
                        href={generatedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Open WhatsApp Chat</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                      </a>

                      <button
                        onClick={handleCopyMessage}
                        className="py-3.5 px-5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-heading font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isCopiedMessage ? (
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

                    {/* Message Preview Box */}
                    <div className="mt-6 w-full max-w-md text-left p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 font-mono text-xs text-neutral-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                      {generatedMessageText}
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-semibold text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit another inquiry</span>
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
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f16738] font-bold block mb-1">
                        Inquiry Brief
                      </span>
                      <h3 className="font-heading font-black text-2xl text-neutral-900 tracking-tight">
                        Tell Makkie about your requirements
                      </h3>
                      <p className="text-neutral-500 font-body text-xs mt-1">
                        Submitting opens WhatsApp with your project details already pre-filled.
                      </p>
                    </div>

                    {/* 1. Name & Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          maxLength={80}
                          autoComplete="name"
                          onChange={(e) => setName(e.target.value)}
                          onBlur={() => handleBlur('name')}
                          placeholder="e.g. Steve Ortiz"
                          className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body ${
                            touched.name && errors.name
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-200/60'
                              : 'border-neutral-200 focus:border-[#f16738] focus:ring-[#f16738]/20'
                          }`}
                        />
                        <FieldError field="name" />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          maxLength={120}
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="steve@studio.com"
                          className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body ${
                            touched.email && errors.email
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-200/60'
                              : 'border-neutral-200 focus:border-[#f16738] focus:ring-[#f16738]/20'
                          }`}
                        />
                        <FieldError field="email" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Phone / WhatsApp Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        maxLength={20}
                        autoComplete="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="e.g. +1 (555) 019-2834 or +234..."
                        className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body ${
                          touched.phone && errors.phone
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-200/60'
                            : 'border-neutral-200 focus:border-[#f16738] focus:ring-[#f16738]/20'
                        }`}
                      />
                      <FieldError field="phone" />
                    </div>

                    {/* 2. Service Interested In */}
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Service Interested In *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES_OPTIONS.map((service) => {
                          const isSelected = selectedService === service;
                          return (
                            <button
                              type="button"
                              key={service}
                              onClick={() => setSelectedService(service)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#f16738] border-[#f16738] text-white shadow-xs'
                                  : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                              }`}
                            >
                              {isSelected && <span className="mr-1.5 font-bold">✓</span>}
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Brief Description of Need */}
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Brief description of what you need *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={description}
                        maxLength={2000}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() => handleBlur('description')}
                        placeholder="Describe your current bottlenecks, tasks you want off your plate, or what your team requires support with..."
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body resize-none leading-relaxed ${
                          touched.description && errors.description
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-200/60'
                            : 'border-neutral-200 focus:border-[#f16738] focus:ring-[#f16738]/20'
                        }`}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <FieldError field="description" />
                        <span className="text-[11px] text-neutral-400 font-mono ml-auto">{description.length}/2000</span>
                      </div>
                    </div>

                    {/* 4. Budget Range & Preferred Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Budget Range
                        </label>
                        <select
                          value={selectedBudget}
                          onChange={(e) => setSelectedBudget(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-xs sm:text-sm text-neutral-800 bg-neutral-50/50 transition-all font-body cursor-pointer"
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Preferred Timeline
                        </label>
                        <select
                          value={selectedTimeline}
                          onChange={(e) => setSelectedTimeline(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#f16738] focus:ring-2 focus:ring-[#f16738]/20 outline-none text-xs sm:text-sm text-neutral-800 bg-neutral-50/50 transition-all font-body cursor-pointer"
                        >
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 5. Anything Else */}
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Anything else you'd like to mention? (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        maxLength={500}
                        onChange={(e) => setNotes(e.target.value)}
                        onBlur={() => handleBlur('notes')}
                        placeholder="Tools you use (ClickUp, Notion, Zapier), timezones, or extra details..."
                        className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 outline-none text-sm text-neutral-900 bg-neutral-50/50 transition-all font-body ${
                          touched.notes && errors.notes
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-200/60'
                            : 'border-neutral-200 focus:border-[#f16738] focus:ring-[#f16738]/20'
                        }`}
                      />
                      <FieldError field="notes" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] disabled:bg-neutral-300 text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(37,211,102,0.35)] disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span>Opening WhatsApp...</span>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4 fill-white" />
                            <span>Send Inquiry via WhatsApp</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                      <p className="mt-2 text-[11px] text-neutral-400 font-body">
                        Opens WhatsApp with all details formatted so Makkie receives your complete brief immediately.
                      </p>
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
