export type AppScreen = 'home' | 'promos' | 'games';
export type MiniSiteMode = 'app' | 'mascot' | 'brand';

export const LL_COLORS = [
  { name: 'Lagoon Blue', hex: '#0066FF', role: 'Primary' },
  { name: 'Sunburst', hex: '#FFE500', role: 'Accent' },
  { name: 'Flamingo', hex: '#FF5CA8', role: 'Hero' },
  { name: 'Palm Mint', hex: '#6EE7B7', role: 'Surface' },
  { name: 'Deep Tide', hex: '#003D99', role: 'Dark' },
] as const;

export const GAME_CATEGORIES = ['Discover', 'Live Casino', 'Slots', 'New Games'] as const;

export type GameCategory = (typeof GAME_CATEGORIES)[number];

export interface LagoonGame {
  id: string;
  title: string;
  category: GameCategory;
  hue: number;
}

export const LAGOON_GAMES: LagoonGame[] = [
  { id: 'sugar', title: 'Sugar Rush 1000', category: 'Slots', hue: 330 },
  { id: 'aloha', title: 'Aloha King Elvis!', category: 'New Games', hue: 45 },
  { id: 'pho', title: 'Pho Sho', category: 'Discover', hue: 200 },
  { id: 'waves', title: 'Wave Riders', category: 'Live Casino', hue: 190 },
  { id: 'tropic', title: 'Tropic Spin', category: 'Slots', hue: 280 },
  { id: 'coral', title: 'Coral Cash', category: 'Discover', hue: 15 },
  { id: 'paradise', title: 'Paradise Drop', category: 'New Games', hue: 160 },
  { id: 'reef', title: 'Reef Riches', category: 'Slots', hue: 220 },
  { id: 'sunset', title: 'Sunset Royale', category: 'Live Casino', hue: 25 },
];

export const POPULAR_GAMES = LAGOON_GAMES.slice(0, 3);

export const PROVIDERS = ['Evolution', 'NetEnt', 'Red Tiger'] as const;
