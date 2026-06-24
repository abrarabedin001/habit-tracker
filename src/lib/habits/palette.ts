/**
 * Habit color palette. Each habit stores a key (e.g. "indigo"); the UI resolves
 * it to a base color (icon/check/filled grid cells) and a muted tint (empty grid
 * cells, icon background). See plan/04-ui-design.md.
 */
export type HabitColorKey =
  | "indigo"
  | "teal"
  | "slate"
  | "amber"
  | "rose"
  | "violet"
  | "emerald"
  | "sky";

export interface HabitColor {
  base: string;
  /** Faint background tint (~12% alpha of base). */
  tint: string;
}

export const HABIT_COLORS: Record<HabitColorKey, HabitColor> = {
  indigo: { base: "#4f46e5", tint: "rgba(79, 70, 229, 0.14)" },
  teal: { base: "#14b8a6", tint: "rgba(20, 184, 166, 0.14)" },
  slate: { base: "#64748b", tint: "rgba(100, 116, 139, 0.16)" },
  amber: { base: "#f59e0b", tint: "rgba(245, 158, 11, 0.16)" },
  rose: { base: "#f43f5e", tint: "rgba(244, 63, 94, 0.14)" },
  violet: { base: "#8b5cf6", tint: "rgba(139, 92, 246, 0.14)" },
  emerald: { base: "#10b981", tint: "rgba(16, 185, 129, 0.14)" },
  sky: { base: "#0ea5e9", tint: "rgba(14, 165, 233, 0.14)" },
};

export function getHabitColor(key: string): HabitColor {
  return HABIT_COLORS[key as HabitColorKey] ?? HABIT_COLORS.indigo;
}
