"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AvailabilityPicker } from "./AvailabilityPicker";


const SITE_KEY =
  process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY_RESERVATIONS ?? "";

const today = () => new Date().toISOString().split("T")[0];
const maxDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().split("T")[0];
};

interface SuccessModalProps {
  reservationId: string;
  onClose: () => void;
}

function SuccessModal({ reservationId, onClose }: SuccessModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-800/60"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-forest-600/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-forest-600"
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
          <h2
            id="success-title"
            className="font-display text-2xl text-charcoal-800 mb-2"
          >
            Reservation Confirmed!
          </h2>
          <p className="text-charcoal-600 mb-4">
            Your table has been reserved. A confirmation email is on its way
            with all the details and a link to cancel if your plans change.
          </p>
          <div className="inline-block bg-cream rounded-xl px-6 py-3 border border-mist">
            <p className="text-xs text-charcoal-600 mb-1">Your booking reference</p>
            <p className="font-display text-2xl text-forest-600 font-semibold tracking-widest">
              {reservationId}
            </p>
          </div>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          className="w-full py-3 bg-forest-600 text-white rounded-xl font-medium hover:bg-forest-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function ReservationForm() {
  const formId = useId();
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [tsToken, setTsToken] = useState<string | null>(null);
  const [tsError, setTsError] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  // Load Turnstile script
  useEffect(() => {
    if (document.getElementById("cf-turnstile-script")) return;
    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // Render Turnstile widget
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
    if (!time) {
      setError("Please select a time slot.");
      return;
    }
    if (!privacyAccepted) {
      setError("Please accept the privacy policy to continue.");
      return;
    }
    if (!tsToken) {
      setError("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          people,
          date,
          time,
          note,
          "cf-turnstile-response": tsToken,
          website: "", // honeypot — must be empty
        }),
      });

      const data = await res.json().catch(() => ({})) as { id?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSuccessId(data.id ?? "");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  }

  function handleModalClose() {
    setSuccessId(null);
    setName("");
    setPhone("");
    setEmail("");
    setPeople(2);
    setDate("");
    setTime(null);
    setNote("");
    setPrivacyAccepted(false);
    resetTurnstile();
  }

  const labelClass = "block text-sm font-medium text-charcoal-800 mb-1";
  const inputClass =
    "w-full rounded-xl border border-mist bg-white px-4 py-3 text-charcoal-800 placeholder:text-charcoal-600/50 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent transition-shadow";

  return (
    <>
      {successId && (
        <SuccessModal reservationId={successId} onClose={handleModalClose} />
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Table reservation form"
        className="space-y-6"
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

        {/* Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-name`} className={labelClass}>
              Full name <span aria-hidden="true">*</span>
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
            <label htmlFor={`${formId}-phone`} className={labelClass}>
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+61 400 000 000"
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email address <span aria-hidden="true">*</span>
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
          <p className="mt-1 text-xs text-charcoal-600">
            Your confirmation and cancellation link will be sent here.
          </p>
        </div>

        {/* Party size */}
        <div>
          <label htmlFor={`${formId}-people`} className={labelClass}>
            Party size <span aria-hidden="true">*</span>
          </label>
          <select
            id={`${formId}-people`}
            required
            value={people}
            onChange={(e) => {
              setPeople(Number(e.target.value));
              setTime(null);
            }}
            className={inputClass}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-charcoal-600">
            For groups of 8+, please{" "}
            <a href="/contact" className="text-forest-600 underline underline-offset-2">
              contact us
            </a>{" "}
            directly.
          </p>
        </div>

        {/* Date */}
        <div>
          <label htmlFor={`${formId}-date`} className={labelClass}>
            Date <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-date`}
            type="date"
            required
            min={today()}
            max={maxDate()}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTime(null);
            }}
            className={inputClass}
          />
        </div>

        {/* Time slot picker */}
        {date && (
          <div>
            <p className={labelClass}>
              Preferred time <span aria-hidden="true">*</span>
            </p>
            <AvailabilityPicker
              date={date}
              people={people}
              selectedTime={time}
              onSelectTime={setTime}
            />
            {!time && (
              <p className="mt-2 text-xs text-charcoal-600">
                Sessions run for approximately 90 minutes.
              </p>
            )}
          </div>
        )}

        {/* Special requests */}
        <div>
          <label htmlFor={`${formId}-note`} className={labelClass}>
            Special requests{" "}
            <span className="font-normal text-charcoal-600">(optional)</span>
          </label>
          <textarea
            id={`${formId}-note`}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Dietary requirements, high chair needed, celebrating a special occasion…"
            className={`${inputClass} resize-none`}
            maxLength={500}
          />
        </div>

        {/* Turnstile */}
        <div>
          <div ref={turnstileRef} aria-label="Security verification" />
          {tsError && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              Security check failed. Please refresh the page and try again.
            </p>
          )}
        </div>

        {/* Privacy */}
        <div className="flex items-start gap-3">
          <input
            id={`${formId}-privacy`}
            type="checkbox"
            required
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-mist text-forest-600 focus:ring-forest-600"
          />
          <label htmlFor={`${formId}-privacy`} className="text-sm text-charcoal-600">
            I agree to The Nordic Deli&apos;s{" "}
            <a
              href="/privacy"
              className="text-forest-600 underline underline-offset-2 hover:text-forest-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            . My contact details will only be used to manage this reservation.{" "}
            <span aria-hidden="true">*</span>
          </label>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || !tsToken}
          className="w-full py-4 bg-forest-600 text-white rounded-xl font-medium text-base hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
        >
          {submitting ? "Confirming your table…" : "Reserve My Table"}
        </button>
      </form>
    </>
  );
}
