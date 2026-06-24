import { and, eq, gte, inArray, isNull, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { habit, habitLog, type Habit, type Frequency } from "@/lib/db/schema";
import { addDays, fromDateStr, mondayOf, toDateStr } from "@/lib/date";
import type { HabitColorKey } from "./palette";
import type { HabitView } from "./types";

/** Days of trailing history rendered in the contribution grid (25 weeks). */
const HISTORY_DAYS = 175;
/** How far back to load logs (covers the grid plus streak look-back). */
const LOOKBACK_DAYS = 400;

/**
 * The log "date" a completion is stored under for a given calendar day:
 * daily habits anchor to the day itself, weekly habits to that week's Monday.
 */
export function anchorDateStr(frequency: Frequency, dayStr: string): string {
  if (frequency === "weekly") return toDateStr(mondayOf(fromDateStr(dayStr)));
  return dayStr;
}

/** Is a daily habit scheduled on this weekday? (empty daysOfWeek = every day) */
function isDue(h: Habit, day: Date): boolean {
  if (h.frequency === "weekly") return true;
  if (!h.daysOfWeek || h.daysOfWeek.length === 0) return true;
  return h.daysOfWeek.includes(day.getDay());
}

/** Current streak of consecutive completed periods ending today. */
function computeStreak(
  frequency: Frequency,
  completed: Set<string>,
  today: Date,
): string {
  let count = 0;
  if (frequency === "weekly") {
    let cursor = mondayOf(today);
    // Don't break the streak if the current (incomplete) week isn't logged yet.
    if (!completed.has(toDateStr(cursor))) cursor = addDays(cursor, -7);
    while (completed.has(toDateStr(cursor))) {
      count++;
      cursor = addDays(cursor, -7);
    }
    return `Streak: ${count} ${count === 1 ? "week" : "weeks"}`;
  }
  let cursor = new Date(today);
  if (!completed.has(toDateStr(cursor))) cursor = addDays(cursor, -1);
  while (completed.has(toDateStr(cursor))) {
    count++;
    cursor = addDays(cursor, -1);
  }
  return `Streak: ${count} ${count === 1 ? "day" : "days"}`;
}

export interface DashboardData {
  habits: HabitView[];
  completionPct: number;
}

/**
 * Load a user's active habits and their completion state for `selectedStr`
 * ("YYYY-MM-DD"), shaped for the dashboard UI.
 */
export async function getDashboard(
  userId: string,
  selectedStr: string,
): Promise<DashboardData> {
  const habits = await db
    .select()
    .from(habit)
    .where(and(eq(habit.userId, userId), isNull(habit.archivedAt)))
    .orderBy(asc(habit.sortOrder), asc(habit.createdAt));

  if (habits.length === 0) return { habits: [], completionPct: 0 };

  const since = toDateStr(addDays(new Date(), -LOOKBACK_DAYS));
  const logs = await db
    .select({ habitId: habitLog.habitId, date: habitLog.date })
    .from(habitLog)
    .where(
      and(
        inArray(
          habitLog.habitId,
          habits.map((h) => h.id),
        ),
        gte(habitLog.date, since),
      ),
    );

  const byHabit = new Map<string, Set<string>>();
  for (const h of habits) byHabit.set(h.id, new Set());
  for (const l of logs) byHabit.get(l.habitId)?.add(l.date);

  const today = new Date();
  const selected = fromDateStr(selectedStr);

  const views: HabitView[] = habits.map((h) => {
    const completed = byHabit.get(h.id) ?? new Set<string>();

    const history: boolean[] = [];
    for (let i = HISTORY_DAYS - 1; i >= 0; i--) {
      const day = addDays(today, -i);
      history.push(completed.has(anchorDateStr(h.frequency, toDateStr(day))));
    }

    return {
      id: h.id,
      name: h.name,
      icon: h.icon,
      color: h.color as HabitColorKey,
      frequency: h.frequency,
      streakLabel: computeStreak(h.frequency, completed, today),
      completedToday: completed.has(anchorDateStr(h.frequency, selectedStr)),
      history,
    };
  });

  const due = habits.filter((h) => isDue(h, selected));
  const doneCount = due.filter((h) =>
    (byHabit.get(h.id) ?? new Set()).has(anchorDateStr(h.frequency, selectedStr)),
  ).length;
  const completionPct = due.length === 0 ? 0 : (doneCount / due.length) * 100;

  return { habits: views, completionPct };
}
