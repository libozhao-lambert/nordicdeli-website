export interface EventFrontmatter {
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  endTime?: string;
  location: string;
  description: string;
  image?: string;
  price?: number;
  seats?: number;
  status: "available" | "sold-out" | "cancelled" | "past";
}

export interface EventData extends EventFrontmatter {
  content: string; // raw MDX content
}
