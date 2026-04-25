export type RegionKey = "southeastAsia" | "southAsia" | "centralEastAsia";

export const NATIONALITIES: Record<RegionKey, readonly string[]> = {
  southeastAsia: [
    "Philippines",
    "Vietnam",
    "Thailand",
    "Indonesia",
    "Cambodia",
    "Myanmar",
    "Laos",
    "Timor-Leste",
  ],
  southAsia: ["Sri Lanka", "Pakistan", "Bangladesh", "Nepal"],
  centralEastAsia: ["Mongolia", "Uzbekistan", "Kyrgyzstan", "China", "Tajikistan"],
} as const;

export const LANGUAGES_TOP: readonly string[] = ["English", "Korean (한국어)"] as const;

export const LANGUAGES: Record<RegionKey, readonly string[]> = {
  southeastAsia: [
    "Filipino",
    "Vietnamese",
    "Thai",
    "Indonesian",
    "Khmer",
    "Burmese",
    "Lao",
    "Tetum",
  ],
  southAsia: ["Sinhala", "Tamil", "Urdu", "Bengali", "Nepali"],
  centralEastAsia: ["Mongolian", "Uzbek", "Kyrgyz", "Chinese", "Tajik"],
} as const;

export const REGION_ORDER: readonly RegionKey[] = [
  "southeastAsia",
  "southAsia",
  "centralEastAsia",
] as const;
