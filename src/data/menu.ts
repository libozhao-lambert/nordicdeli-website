import type { MenuCategory } from "@/types/menu";

export const MENU: MenuCategory[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    availableNote: "Available All Day",
    sections: [
      {
        id: "eggs",
        title: "Eggs Your Way",
        subtitle:
          "Served with grilled tomato & toasted Turkish bread",
        items: [
          {
            id: "eggs-classic",
            name: "Classic",
            price: 15,
            tags: ["VG", "GFO"],
            featured: false,
          },
          {
            id: "eggs-bacon",
            name: "With Bacon or Boneless Ham",
            price: 19,
            tags: ["GFO"],
          },
          {
            id: "eggs-avo",
            name: "With Avocado or Mushrooms",
            price: 19,
            tags: ["VG", "GFO"],
          },
          {
            id: "eggs-salmon",
            name: "With Salmon",
            price: 22,
            tags: ["GFO"],
          },
        ],
      },
      {
        id: "wraps",
        title: "Wraps & Burgers",
        items: [
          {
            id: "brekkie-wrap",
            name: "Brekkie Wrap",
            description:
              "Bacon, fried egg, hashbrowns, tomato or BBQ sauce",
            price: 20,
          },
          {
            id: "veggie-wrap",
            name: "Veggie Wrap",
            description:
              "Grilled mushrooms, avocado, spinach, tomato, aioli",
            price: 18,
            tags: ["VG"],
          },
        ],
      },
      {
        id: "bowls",
        title: "Bowls & Porridge",
        items: [
          {
            id: "acai-bowl",
            name: "Açaí Bowl",
            description:
              "Blended açaí, banana, granola, seasonal fruits, honey",
            price: 17,
            tags: ["VG", "GF"],
          },
          {
            id: "porridge",
            name: "Nordic Porridge",
            description:
              "Creamy oats with cinnamon, brown sugar, seasonal berries, and cream",
            price: 14,
            tags: ["VG"],
          },
        ],
      },
      {
        id: "vegan",
        title: "Vegan Plates",
        items: [
          {
            id: "avo-toast",
            name: "Avocado Toast",
            description:
              "Smashed avocado on grilled sourdough, crowned with cherry tomatoes, dukkah, lemon zest and a drizzle of cold-pressed olive oil",
            price: 18,
            tags: ["VG", "V", "DF"],
            featured: true,
          },
        ],
      },
      {
        id: "kids",
        title: "Kids Menu",
        subtitle: "For our little Vikings",
        items: [
          {
            id: "kids-eggs",
            name: "Kids Eggs on Toast",
            price: 9,
            tags: ["VG"],
          },
          {
            id: "kids-pancakes",
            name: "Mini Pancakes",
            description: "With maple syrup and fresh berries",
            price: 10,
            tags: ["VG"],
          },
        ],
      },
    ],
  },
  {
    id: "lunch",
    label: "Lunch",
    availableNote: "Available All Day",
    sections: [
      {
        id: "sandwiches",
        title: "Sandwiches & Bagels",
        items: [
          {
            id: "smoked-salmon-bagel",
            name: "Smoked Salmon Bagel",
            description:
              "Cream cheese, capers, dill, red onion, cucumber",
            price: 19,
          },
          {
            id: "chicken-club",
            name: "Chicken Club Sandwich",
            description:
              "Toasted Turkish bread layered with grilled chicken breast, crispy bacon, fresh cos lettuce, ripe tomato and house-made aioli",
            price: 18,
            featured: true,
          },
          {
            id: "veggie-bagel",
            name: "Veggie Bagel",
            description: "Hummus, roasted capsicum, spinach, feta, avocado",
            price: 16,
            tags: ["VG"],
          },
        ],
      },
      {
        id: "hot-meals",
        title: "Hot Meals",
        items: [
          {
            id: "eggs-benny",
            name: "Eggs Benedict",
            description:
              "Poached eggs, hollandaise, smoked salmon or bacon on English muffin",
            price: 22,
          },
          {
            id: "frittata",
            name: "Seasonal Frittata",
            description: "Ask our staff for today's selection",
            price: 17,
            tags: ["VG", "GF"],
          },
        ],
      },
      {
        id: "soup",
        title: "Soup",
        subtitle: "Ask our staff for today's selection",
        items: [
          {
            id: "soup-of-day",
            name: "Soup of the Day",
            description: "Served with freshly baked bread",
            price: 14,
          },
        ],
      },
      {
        id: "toasties",
        title: "Toasties",
        items: [
          {
            id: "ham-cheese",
            name: "Ham & Cheese Toastie",
            price: 12,
          },
          {
            id: "veggie-toastie",
            name: "Veggie Toastie",
            description: "Mushroom, spinach, mozzarella",
            price: 12,
            tags: ["VG"],
          },
        ],
      },
    ],
  },
  {
    id: "extras",
    label: "Extras & Treats",
    sections: [
      {
        id: "pastries",
        title: "Nordic Pastries & Bakery",
        subtitle: "Freshly baked daily",
        items: [
          {
            id: "kanelsnurre",
            name: "Kanelsnurre",
            description:
              "Warm Nordic cinnamon swirl — a Scandinavian classic",
            price: 6,
            tags: ["VG"],
            featured: true,
          },
          {
            id: "carrot-cake",
            name: "Nordic Carrot Cake",
            description: "Moist and perfectly spiced with cream cheese frosting",
            price: 7,
            tags: ["VG"],
          },
          {
            id: "droemmekage",
            name: "Drømmekage",
            description:
              "Classic Danish dream cake with toasted coconut topping",
            price: 7,
            tags: ["VG"],
          },
          {
            id: "scone",
            name: "Scone with Jam & Cream",
            description: "Freshly baked, served warm",
            price: 6,
            tags: ["VG"],
          },
          {
            id: "quiche",
            name: "House Quiche",
            description: "Ask our staff for today's selection",
            price: 8,
          },
          {
            id: "croissant",
            name: "Butter Croissant",
            price: 5,
            tags: ["VG"],
          },
        ],
      },
      {
        id: "drinks",
        title: "Coffee & Drinks",
        items: [
          {
            id: "espresso",
            name: "Espresso",
            price: 4,
          },
          {
            id: "latte",
            name: "Latte / Flat White / Cappuccino",
            price: 5,
          },
          {
            id: "cold-brew",
            name: "Cold Brew Coffee",
            price: 6,
          },
          {
            id: "tea",
            name: "Loose-Leaf Tea",
            description: "Ask our staff for today's selection",
            price: 4,
            tags: ["VG", "GF", "DF"],
          },
          {
            id: "juice",
            name: "Fresh-Squeezed Juice",
            description: "Orange or seasonal blend",
            price: 7,
            tags: ["VG", "GF", "DF"],
          },
          {
            id: "smoothie",
            name: "Smoothie",
            description: "Ask our staff for today's blend",
            price: 8,
            tags: ["VG", "GF", "DF"],
          },
        ],
      },
      {
        id: "sides",
        title: "Sides",
        items: [
          {
            id: "extra-egg",
            name: "Extra Egg",
            price: 3,
          },
          {
            id: "extra-bacon",
            name: "Extra Bacon / Ham",
            price: 4,
          },
          {
            id: "hashbrown",
            name: "Hashbrown",
            price: 3,
            tags: ["VG"],
          },
          {
            id: "toast",
            name: "Toast (2 slices)",
            price: 3,
            tags: ["VG"],
          },
          {
            id: "extra-avo",
            name: "Avocado",
            price: 4,
            tags: ["VG", "GF", "DF"],
          },
        ],
      },
    ],
  },
];

export const FEATURED_ITEMS = MENU.flatMap((cat) =>
  cat.sections.flatMap((sec) => sec.items.filter((item) => item.featured))
);

export function getCategoryById(id: string): MenuCategory | undefined {
  return MENU.find((cat) => cat.id === id);
}

export const DIETARY_LABELS: Record<string, string> = {
  VG: "Vegetarian",
  V: "Vegan",
  GF: "Gluten Free",
  GFO: "GF Option",
  DF: "Dairy Free",
  N: "Contains Nuts",
};
