'use client';

import { useState, useEffect, useRef, useId } from 'react';
import Link from 'next/link';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzO3JHqZBfqP95SeuyFCwFWDfzxShx7n-jcS3M4aqc-iY-h5zYMHQMZKrDBzuehEGlB/exec';

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
    consent: false,
  });

  // Open / close lifecycle: remember trigger, open, animate, focus first field.
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
        // Restore focus to the element that opened the modal.
        if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
          triggerRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // Body scroll lock while open.
  useEffect(() => {
    if (!shouldRender) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldRender]);

  // Auto-focus first input when dialog enters.
  useEffect(() => {
    if (animationState === 'entering' && firstFieldRef.current) {
      // slight delay so the input is in the DOM and visible before focus
      const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [animationState]);

  // Keyboard handling: Escape closes, Tab wraps within the dialog.
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
        page: window.location.href,
        source: 'Driveway Gates Surrey',
      };

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

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
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm
        ${animationState === 'entering' ? 'animate-backdrop-in' : animationState === 'exiting' ? 'animate-backdrop-out' : 'opacity-100'}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl
          ${animationState === 'entering' ? 'animate-modal-in' : 'animate-modal-out'}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 id={titleId} className="text-2xl font-display font-bold text-gray-900">Request Received!</h2>
              <p id={descId} className="text-gray-600">We&apos;ve matched you with a vetted installer. Check your email for next steps.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                  Free Matching Service
                </span>
                <h2 id={titleId} className="text-2xl font-display font-bold text-gray-900">Find Your Gate Installer</h2>
                <p id={descId} className="text-gray-600 text-sm mt-1">Complete the form to get matched with vetted Surrey gate installers.</p>
              </div>

              {errorMessage && (
                <div
                  id={errorId}
                  role="alert"
                  className="mb-4 flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1">{errorMessage}</div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Dismiss error"
                  >
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="sr-only" htmlFor="lfm-phone">Phone number</label>
                    <input
                      id="lfm-phone"
                      required
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="lfm-email">Email address</label>
                    <input
                      id="lfm-email"
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className={inputClass}
                    />
                  </div>
                </div>

                <label className="sr-only" htmlFor="lfm-location">Surrey town or postcode</label>
                <input
                  id="lfm-location"
                  required
                  name="location"
                  type="text"
                  autoComplete="postal-code"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your Surrey town or postcode"
                  className={inputClass}
                />

                <label htmlFor={consentId} className="flex items-start gap-3 mt-2 text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                  <input
                    id={consentId}
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>
                    I agree that my details will be shared with a carefully selected UK gate installer in our network who will contact me directly. See our <Link href="/privacy/" className="text-brand-600 hover:underline">privacy policy</Link>.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm mt-1"
                >
                  {isSubmitting ? 'Sending...' : 'Check Availability'}
                </button>

                <p className="text-center text-xs text-gray-400 mt-1">
                  Free service. No obligation. No spam.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
