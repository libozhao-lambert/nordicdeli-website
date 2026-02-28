"use client";

import { useEffect, useId, useRef, useState } from "react";


const SITE_KEY = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY_CONTACT ?? "";

const SUBJECT_OPTIONS = [
  "General enquiry",
  "Reservation question",
  "Catering / private event",
  "Feedback",
  "Media / press",
  "Other",
];

export function ContactForm() {
  const formId = useId();
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");

  const [tsToken, setTsToken] = useState<string | null>(null);
  const [tsError, setTsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (document.getElementById("cf-turnstile-script")) return;
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!SITE_KEY || !turnstileRef.current) return;

    function tryRender() {
      if (!window.turnstile || !turnstileRef.current) return;
      if (widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: SITE_KEY,
        callback: (token) => {
          setTsToken(token);
          setTsError(false);
        },
        "error-callback": () => setTsError(true),
        "expired-callback": () => setTsToken(null),
        theme: "light",
      });
    }

    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        tryRender();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  function resetTurnstile() {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
      setTsToken(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tsToken) {
      setError("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          "cf-turnstile-response": tsToken,
          website: "", // honeypot
        }),
      });

      const data = await res.json().catch(() => ({})) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  }

  const labelClass = "block text-sm font-medium text-charcoal-800 mb-1";
  const inputClass =
    "w-full rounded-xl border border-mist bg-white px-4 py-3 text-charcoal-800 placeholder:text-charcoal-600/50 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent transition-shadow";

  if (sent) {
    return (
      <div className="rounded-2xl bg-forest-600/10 border border-forest-600/20 px-6 py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-forest-600/10 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-forest-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-xl text-charcoal-800 mb-2">
          Message sent!
        </h3>
        <p className="text-charcoal-600 text-sm">
          Thank you for getting in touch. We&apos;ll get back to you as soon as
          possible — usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-subject`} className={labelClass}>
          Subject <span aria-hidden="true">*</span>
        </label>
        <select
          id={`${formId}-subject`}
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help you?"
          className={`${inputClass} resize-none`}
          maxLength={2000}
        />
        <p className="mt-1 text-xs text-charcoal-600 text-right">
          {message.length}/2000
        </p>
      </div>

      <div>
        <div ref={turnstileRef} aria-label="Security verification" />
        {tsError && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            Security check failed. Please refresh and try again.
          </p>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !tsToken}
        className="w-full py-3 bg-forest-600 text-white rounded-xl font-medium hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
