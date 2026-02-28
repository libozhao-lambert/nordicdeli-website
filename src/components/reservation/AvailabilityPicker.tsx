"use client";

import { useEffect, useState } from "react";

interface AvailabilityPickerProps {
  date: string;
  people: number;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

type Slot = {
  time: string;
  available: boolean;
};

export function AvailabilityPicker({
  date,
  people,
  selectedTime,
  onSelectTime,
}: AvailabilityPickerProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    const controller = new AbortController();

    async function fetchSlots() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/reservations/availability?date=${encodeURIComponent(date)}&people=${people}`,
          { signal: controller.signal }
        );
        const data = await res.json().catch(() => ({})) as { slots?: Slot[]; error?: string };
        if (!res.ok) {
          throw new Error(data.error ?? "Failed to load availability.");
        }
        setSlots(data.slots ?? []);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Could not load available times.");
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
    return () => controller.abort();
  }, [date, people]);

  if (!date) {
    return (
      <p className="text-sm text-charcoal-600 italic">
        Select a date above to see available times.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-charcoal-600" aria-live="polite">
        <span className="inline-block h-4 w-4 rounded-full border-2 border-forest-600 border-t-transparent animate-spin" aria-hidden="true" />
        Loading available times…
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {error}
      </p>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="text-sm text-charcoal-600 italic">
        No times available for this date. Please try another day.
      </p>
    );
  }

  const available = slots.filter((s) => s.available);

  return (
    <fieldset>
      <legend className="sr-only">Select a time</legend>
      {available.length === 0 ? (
        <p className="text-sm text-charcoal-600 italic">
          All times are fully booked on this date. Please try another day.
        </p>
      ) : (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
          role="group"
          aria-label="Available time slots"
        >
          {slots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => slot.available && onSelectTime(slot.time)}
                aria-pressed={isSelected}
                aria-label={`${slot.time}${!slot.available ? " (unavailable)" : ""}`}
                className={[
                  "py-2 px-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-1",
                  !slot.available
                    ? "bg-mist text-charcoal-600/40 cursor-not-allowed line-through"
                    : isSelected
                    ? "bg-forest-600 text-white"
                    : "bg-white border border-mist text-charcoal-800 hover:border-forest-600 hover:text-forest-600",
                ].join(" ")}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}
