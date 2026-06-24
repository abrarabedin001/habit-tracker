import type { HabitColorKey } from "./palette";

/**
 * Mock dashboard data for the Phase 0 skeleton. Replaced by real per-user
 * queries in Phase 1 (see plan/03-roadmap.md).
 */
export interface HabitView {
  id: string;
  name: string;
  icon: string;
  color: HabitColorKey;
  frequency: "daily" | "weekly";
  streakLabel: string;
  completedToday: boolean;
  /** Trailing history, oldest → newest. true = completed that period. */
  history: boolean[];
}

/** Deterministic pseudo-history so the skeleton renders a believable grid. */
function history(seed: number, length = 175): boolean[] {
  const out: boolean[] = [];
  let x = seed;
  for (let i = 0; i < length; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    out.push((x >> 8) % 5 === 0 ? false : (x >> 4) % 3 === 0);
  }
  return out;
}

export const MOCK_HABITS: HabitView[] = [
  {
    id: "reading-quran",
    name: "Reading Quran",
    icon: "book-open",
    color: "indigo",
    frequency: "daily",
    streakLabel: "Streak: 1 day",
    completedToday: true,
    history: history(7),
  },
  {
    id: "exercise",
    name: "Exercise",
    icon: "dumbbell",
    color: "teal",
    frequency: "weekly",
    streakLabel: "Streak: 0 weeks",
    completedToday: true,
    history: history(23),
  },
  {
    id: "learn-dev-ops",
    name: "Learn Dev Ops",
    icon: "moon",
    color: "slate",
    frequency: "weekly",
    streakLabel: "Streak: 0 weeks",
    completedToday: false,
    history: history(91),
  },
];

export const MOCK_COMPLETION_PCT = 5.8;
