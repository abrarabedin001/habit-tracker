/**
 * Application schema (Drizzle, Postgres). See plan/02-data-model.md.
 */
import {
  pgTable,
  text,
  integer,
  timestamp,
  date,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

/** How often a habit is expected to be completed. */
export type Frequency = "daily" | "weekly";

export const habit = pgTable("habit", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  /** lucide-react icon key, e.g. "graduation-cap". */
  icon: text("icon").notNull().default("circle-check"),
  /** Habit palette key (see plan/04-ui-design.md), e.g. "indigo". */
  color: text("color").notNull().default("indigo"),
  frequency: text("frequency").$type<Frequency>().notNull().default("daily"),
  /** Completions needed within one period to count it "done". */
  targetPerPeriod: integer("target_per_period").notNull().default(1),
  /** For daily habits: active weekdays as [0..6] (0 = Sunday). Empty = every day. */
  daysOfWeek: jsonb("days_of_week").$type<number[]>().notNull().default([]),
  /** Optional filter-chip grouping (e.g. "Test"). */
  category: text("category"),
  /** Optional local reminder time "HH:mm". */
  reminderTime: text("reminder_time"),
  sortOrder: integer("sort_order").notNull().default(0),
  archivedAt: timestamp("archived_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const habitLog = pgTable(
  "habit_log",
  {
    id: text("id").primaryKey(),
    habitId: text("habit_id")
      .notNull()
      .references(() => habit.id, { onDelete: "cascade" }),
    /** Period anchor: the day, or the week's Monday for weekly habits. */
    date: date("date").notNull(),
    value: integer("value").notNull().default(1),
    note: text("note"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [uniqueIndex("habit_log_habit_date_unq").on(t.habitId, t.date)],
);

export const habitRelations = relations(habit, ({ one, many }) => ({
  user: one(user, { fields: [habit.userId], references: [user.id] }),
  logs: many(habitLog),
}));

export const habitLogRelations = relations(habitLog, ({ one }) => ({
  habit: one(habit, { fields: [habitLog.habitId], references: [habit.id] }),
}));

export type Habit = typeof habit.$inferSelect;
export type NewHabit = typeof habit.$inferInsert;
export type HabitLog = typeof habitLog.$inferSelect;
export type NewHabitLog = typeof habitLog.$inferInsert;
