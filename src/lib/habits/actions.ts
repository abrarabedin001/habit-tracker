"use server";

import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { habit, habitLog, type Frequency } from "@/lib/db/schema";
import { requireUserId } from "@/lib/auth-helpers";
import { HABIT_COLORS, type HabitColorKey } from "./palette";
import { anchorDateStr } from "./queries";

const FREQUENCIES: Frequency[] = ["daily", "weekly"];

/** Create a habit for the signed-in user, then return to the dashboard. */
export async function createHabit(formData: FormData) {
  const userId = await requireUserId();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");

  const icon = String(formData.get("icon") ?? "circle-check");
  const colorRaw = String(formData.get("color") ?? "indigo");
  const color: HabitColorKey = colorRaw in HABIT_COLORS
    ? (colorRaw as HabitColorKey)
    : "indigo";
  const freqRaw = String(formData.get("frequency") ?? "daily") as Frequency;
  const frequency: Frequency = FREQUENCIES.includes(freqRaw) ? freqRaw : "daily";

  await db.insert(habit).values({
    id: randomUUID(),
    userId,
    name,
    icon,
    color,
    frequency,
  });

  revalidatePath("/");
  redirect("/");
}

/**
 * Toggle a habit's completion for a calendar day ("YYYY-MM-DD"). Inserts a log
 * if absent, deletes it if present. Verifies the habit belongs to the user.
 */
export async function toggleCompletion(habitId: string, dayStr: string) {
  const userId = await requireUserId();

  const [row] = await db
    .select({ id: habit.id, frequency: habit.frequency })
    .from(habit)
    .where(and(eq(habit.id, habitId), eq(habit.userId, userId)));
  if (!row) throw new Error("Habit not found");

  const date = anchorDateStr(row.frequency, dayStr);

  const [existing] = await db
    .select({ id: habitLog.id })
    .from(habitLog)
    .where(and(eq(habitLog.habitId, habitId), eq(habitLog.date, date)));

  if (existing) {
    await db.delete(habitLog).where(eq(habitLog.id, existing.id));
  } else {
    await db.insert(habitLog).values({ id: randomUUID(), habitId, date });
  }

  revalidatePath("/");
}

/** Archive (soft-delete) a habit owned by the signed-in user. */
export async function archiveHabit(habitId: string) {
  const userId = await requireUserId();
  await db
    .update(habit)
    .set({ archivedAt: new Date() })
    .where(and(eq(habit.id, habitId), eq(habit.userId, userId)));
  revalidatePath("/");
}
