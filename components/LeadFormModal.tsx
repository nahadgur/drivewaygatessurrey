'use client';

import { useState, useEffect, useRef, useId } from 'react';
import Link from 'next/link';
import { CheckCircle, X, AlertCircle, ArrowUpRight } from 'lucide-react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzO3JHqZBfqP95SeuyFCwFWDfzxShx7n-jcS3M4aqc-iY-h5zYMHQMZKrDBzuehEGlB/exec';

const GATE_TYPES = [
  'Wooden Driveway Gates',
  'Metal Driveway Gates',
  'Electric Sliding Gates',
  'Electric Swing Gates',
  'Automated Gate Systems',
  'Gate Repair and Maintenance',
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const titleId = useId();
  const descId = useId();
  const consentId = useId();
  const errorId = useId();

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animationState, setAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    treatment: '',
    consent: false,
  });

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = (document.activeElement as HTMLElement) || null;
      setShouldRender(true);
      setAnimationState('entering');
    } else if (shouldRender) {
      setAnimationState('exiting');
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimationState('idle');
        if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
          triggerRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, [shouldRender]);

  useEffect(() => {
    if (animationState === 'entering' && firstFieldRef.current) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [animationState]);

  useEffect(() => {
    if (!shouldRender) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: target.value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMessage('Please tick the consent box so we can share your details with an installer in our network.');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        treatment: formData.treatment,
        page: window.location.href,
        source: 'Driveway Gates Surrey',
      };
      const res = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
      const text = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try { data = JSON.parse(text); } catch {}
      if (data && data.ok === false) throw new Error(data.error || 'Submission failed');
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => { setIsSuccess(false); onClose(); }, 3000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage('Something went wrong sending your enquiry. Please try again, or email hello@drivewaygatessurrey.uk.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputClass =
    'w-full px-4 py-3.5 border-2 border-teal-line bg-white text-teal-ink placeholder-teal-muted text-[15px] font-sans ' +
    'focus:outline-none focus:border-teal-brand focus:ring-0 transition-colors';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-teal-ink/60 backdrop-blur-sm
        ${animationState === 'entering' ? 'animate-backdrop-in' : animationState === 'exiting' ? 'animate-backdrop-out' : 'opacity-100'}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`relative w-full max-w-lg overflow-hidden bg-paper border-2 border-teal-ink
          max-h-[95vh] overflow-y-auto
          ${animationState === 'entering' ? 'animate-modal-in' : 'animate-modal-out'}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-teal-muted hover:text-teal-ink transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand"
          aria-label="Close"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center text-center p-8 space-y-4">
            <div className="w-14 h-14 bg-teal-soft text-teal-deep rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 id={titleId} className="font-display text-[1.6rem] leading-tight tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
              Request received.
            </h3>
            <p id={descId} className="font-prose text-[16px] leading-relaxed text-teal-ink/80 max-w-sm">
              We&apos;ve matched your enquiry with a vetted Surrey installer. Check your email — we&apos;ll be in touch within four working hours.
            </p>
          </div>
        ) : (
          <>
            <div className="px-6 md:px-8 pt-8 pb-5 border-b border-teal-line">
              <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-2">
                Free quote request
              </div>
              <h3 id={titleId} className="font-display text-[1.6rem] leading-tight tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
                Three installer quotes, <span className="font-editorial italic font-normal text-teal-brand">delivered.</span>
              </h3>
              <p id={descId} className="font-prose text-[15px] leading-relaxed text-teal-ink/70 mt-1.5">
                Vetted Surrey specialists reply within four working hours. Free, no obligation at any stage.
              </p>
            </div>

            <div className="p-6 md:p-8">
              {errorMessage && (
                <div
                  id={errorId}
                  role="alert"
                  className="mb-4 flex items-start gap-3 p-3 border-2 border-red-300 bg-red-50 text-red-900 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1">{errorMessage}</div>
                  <button type="button" onClick={() => setErrorMessage(null)} className="text-red-700 hover:text-red-900" aria-label="Dismiss error">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                <label className="sr-only" htmlFor="lfm-fullName">Full name</label>
                <input
                  ref={firstFieldRef}
                  id="lfm-fullName"
                  required
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="sr-only" htmlFor="lfm-phone">Phone number</label>
                    <input id="lfm-phone" required name="phone" type="tel" autoComplete="tel"
                      value={formData.phone} onChange={handleChange} placeholder="Phone" className={inputClass} />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="lfm-email">Email address</label>
                    <input id="lfm-email" required name="email" type="email" autoComplete="email"
                      value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} />
                  </div>
                </div>

                <label className="sr-only" htmlFor="lfm-treatment">Gate type</label>
                <div className="relative">
                  <select
                    id="lfm-treatment"
                    required
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    className={inputClass + ' appearance-none cursor-pointer pr-10'}
                  >
                    <option value="" disabled>Type of gate</option>
                    {GATE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-teal-brand">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <label className="sr-only" htmlFor="lfm-location">Surrey town or postcode</label>
                <input id="lfm-location" required name="location" type="text" autoComplete="postal-code"
                  value={formData.location} onChange={handleChange} placeholder="Surrey town or postcode" className={inputClass} />

                <label htmlFor={consentId} className="flex items-start gap-3 mt-2 text-[12px] text-teal-ink/75 leading-relaxed cursor-pointer select-none">
                  <input
                    id={consentId}
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 border-teal-line text-teal-brand focus:ring-teal-brand focus:ring-offset-0"
                  />
                  <span>
                    I agree my details will be shared with a selected UK gate installer in the Driveway Gates Surrey network, who will contact me directly. See our <Link href="/privacy/" className="text-teal-brand underline underline-offset-2 hover:text-teal-ink">privacy policy</Link>.
                  </span>
                </label>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  aria-describedby={errorMessage ? errorId : undefined}
                  className="btn-primary w-full justify-between mt-2 disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Get Three Free Quotes'}</span>
                  {!isSubmitting && <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
