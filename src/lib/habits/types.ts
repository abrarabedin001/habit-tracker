import type { HabitColorKey } from "./palette";
import type { Frequency } from "@/lib/db/schema";

/**
 * Shape the dashboard UI renders. Built from real per-user rows in
 * `lib/habits/queries.ts` for a given selected day.
 */
export interface HabitView {
  id: string;
  name: string;
  icon: string;
  color: HabitColorKey;
  frequency: Frequency;
  streakLabel: string;
  /** Whether the habit is marked done for the currently selected day. */
  completedToday: boolean;
  /** Trailing history, oldest → newest. true = completed that period. */
  history: boolean[];
}
