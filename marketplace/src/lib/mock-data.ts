export type Designer = {
  id: string;
  name: string;
  location: string;
  bio: string;
  styles: string[];
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  portfolioUrls: string[];
  yearsExperience: number;
  available: boolean;
};

export const FEATURED_DESIGNERS: Designer[] = [
  {
    id: "1",
    name: "Aria Nguyen",
    location: "Portland, OR",
    bio: "Specializing in romantic garden-style arrangements and sustainable florals. Available for weddings and intimate events.",
    styles: ["Garden", "Romantic", "Sustainable"],
    pricePerHour: 95,
    rating: 4.9,
    reviewCount: 48,
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=aria",
    portfolioUrls: [],
    yearsExperience: 7,
    available: true,
  },
  {
    id: "2",
    name: "Marcus Bell",
    location: "Brooklyn, NY",
    bio: "Modern, architectural floral design with a bold editorial flair. Featured in Vogue Weddings.",
    styles: ["Modern", "Editorial", "Architectural"],
    pricePerHour: 145,
    rating: 4.8,
    reviewCount: 31,
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=marcus",
    portfolioUrls: [],
    yearsExperience: 10,
    available: true,
  },
  {
    id: "3",
    name: "Sofia Reyes",
    location: "Austin, TX",
    bio: "Wildflower and boho arrangements with a warm Texas charm. Corporate installs and wedding arches.",
    styles: ["Wildflower", "Boho", "Rustic"],
    pricePerHour: 75,
    rating: 5.0,
    reviewCount: 22,
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=sofia",
    portfolioUrls: [],
    yearsExperience: 4,
    available: false,
  },
  {
    id: "4",
    name: "Yuki Tanaka",
    location: "Seattle, WA",
    bio: "Japanese minimalism meets Pacific Northwest botanicals. Expert in ikebana-inspired installations.",
    styles: ["Minimalist", "Ikebana", "Japanese"],
    pricePerHour: 120,
    rating: 4.7,
    reviewCount: 19,
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=yuki",
    portfolioUrls: [],
    yearsExperience: 8,
    available: true,
  },
  {
    id: "5",
    name: "Cleo Baptiste",
    location: "New Orleans, LA",
    bio: "Lush, tropical arrangements influenced by Creole culture. Specializing in festivals and large-scale events.",
    styles: ["Tropical", "Lush", "Cultural"],
    pricePerHour: 85,
    rating: 4.9,
    reviewCount: 37,
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=cleo",
    portfolioUrls: [],
    yearsExperience: 6,
    available: true,
  },
  {
    id: "6",
    name: "Devon Walsh",
    location: "Denver, CO",
    bio: "Mountain-inspired, earthy arrangements using locally sourced and dried botanicals.",
    styles: ["Earthy", "Dried", "Mountain"],
    pricePerHour: 80,
    rating: 4.6,
    reviewCount: 14,
    avatarUrl: "https://api.dicebear.com/9.x/personas/svg?seed=devon",
    portfolioUrls: [],
    yearsExperience: 3,
    available: true,
  },
];

export function getDesignerById(id: string): Designer | undefined {
  return FEATURED_DESIGNERS.find((d) => d.id === id);
}
