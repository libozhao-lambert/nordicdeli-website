export type DietaryTag = "VG" | "V" | "GF" | "GFO" | "DF" | "N";

export interface MenuItemVariant {
  label: string;
  price: number;
  tags?: DietaryTag[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  variants?: MenuItemVariant[];
  tags?: DietaryTag[];
  featured?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export type MenuCategoryId = "breakfast" | "lunch" | "extras";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  availableNote?: string;
  sections: MenuSection[];
}
