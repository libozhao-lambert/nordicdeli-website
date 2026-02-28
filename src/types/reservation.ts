export type ReservationStatus = "confirmed" | "cancelled";

export interface Reservation {
  id: string; // "R-XXXXX"
  createdAt: string; // ISO 8601
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  people: number; // 1–12
  startAt: string; // ISO 8601 AEST (+10:00)
  durationMin: number; // 90
  note: string;
  status: ReservationStatus;
  meta: {
    ipHash: string;
    requestId: string;
  };
}
