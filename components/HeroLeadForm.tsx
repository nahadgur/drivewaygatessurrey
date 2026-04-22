'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle, X, ArrowUpRight } from 'lucide-react';

interface HeroLeadFormProps {
  city?: string;
  service?: string;
}

const GATE_TYPES = [
  'Wooden Driveway Gates',
  'Metal Driveway Gates',
  'Electric Sliding Gates',
  'Electric Swing Gates',
  'Automated Gate Systems',
  'Gate Repair and Maintenance',
];

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzO3JHqZBfqP95SeuyFCwFWDfzxShx7n-jcS3M4aqc-iY-h5zYMHQMZKrDBzuehEGlB/exec';

export function HeroLeadForm({ city, service }: HeroLeadFormProps) {
  const consentId = useId();
  const errorId = useId();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: city || '',
    treatment: service || '',
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: target.value });
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
        location: formData.location || city || '',
        treatment: formData.treatment || service || '',
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
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage('Something went wrong sending your enquiry. Please try again, or email hello@drivewaygatessurrey.uk.');
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 border-2 border-teal-line bg-white text-teal-ink placeholder-teal-muted text-[15px] font-sans ' +
    'focus:outline-none focus:border-teal-brand focus:ring-0 transition-colors';

  if (isSuccess) {
    return (
      <div className="bg-white border-2 border-teal-ink p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[340px]">
        <div className="w-14 h-14 bg-teal-soft text-teal-deep rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-[1.6rem] leading-tight tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
          Request received.
        </h3>
        <p className="font-prose text-[16px] leading-relaxed text-teal-ink/80 max-w-sm">
          We&apos;ve matched your enquiry with a vetted installer{city ? ` in ${city}` : ''}. Check your email — we&apos;ll be in touch within four working hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-teal-ink">
      <div className="px-6 pt-6 pb-5 border-b border-teal-line">
        <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-2">
          Free quote request
        </div>
        <h3 className="font-display text-[1.5rem] leading-tight tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
          Three installer quotes{city ? (
            <>
              , <span className="font-editorial italic font-normal text-teal-brand">for {city}.</span>
            </>
          ) : (
            <>, <span className="font-editorial italic font-normal text-teal-brand">delivered.</span></>
          )}
        </h3>
        <p className="font-prose text-[15px] leading-relaxed text-teal-ink/70 mt-1.5">
          Vetted Surrey specialists reply within four working hours.
        </p>
      </div>

      <div className="p-6">
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
          <label className="sr-only" htmlFor="hlf-fullName">Full name</label>
          <input
            id="hlf-fullName"
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
              <label className="sr-only" htmlFor="hlf-phone">Phone number</label>
              <input
                id="hlf-phone"
                required
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={inputClass}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="hlf-email">Email address</label>
              <input
                id="hlf-email"
                required
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputClass}
              />
            </div>
          </div>

          <label className="sr-only" htmlFor="hlf-treatment">Gate type</label>
          <div className="relative">
            <select
              id="hlf-treatment"
              required
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className={inputClass + ' appearance-none cursor-pointer pr-10'}
            >
              <option value="" disabled>Type of gate</option>
              {GATE_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-teal-brand">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {!city && (
            <>
              <label className="sr-only" htmlFor="hlf-location">Surrey town or postcode</label>
              <input
                id="hlf-location"
                required
                name="location"
                type="text"
                autoComplete="postal-code"
                value={formData.location}
                onChange={handleChange}
                placeholder="Surrey town or postcode"
                className={inputClass}
              />
            </>
          )}

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

          <div className="flex items-center justify-center gap-4 pt-2">
            {['Free service', 'No spam', '4-hour response'].map(item => (
              <span key={item} className="flex items-center gap-1.5 text-[11px] text-teal-brand font-medium">
                <span className="w-1 h-1 bg-accent rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
