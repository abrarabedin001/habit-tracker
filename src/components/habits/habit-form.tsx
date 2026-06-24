"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { createHabit } from "@/lib/habits/actions";
import { HABIT_COLORS, type HabitColorKey } from "@/lib/habits/palette";
import { HabitIcon } from "./habit-icon";

const ICON_OPTIONS = [
  "book-open",
  "dumbbell",
  "moon",
  "graduation-cap",
  "code",
  "droplet",
  "heart",
  "pen-line",
  "circle-check",
];

const COLOR_OPTIONS = Object.keys(HABIT_COLORS) as HabitColorKey[];

/** Create-habit form: name, frequency, icon and color. Submits a server action. */
export function HabitForm() {
  const [icon, setIcon] = useState(ICON_OPTIONS[0]);
  const [color, setColor] = useState<HabitColorKey>("indigo");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const { base, tint } = HABIT_COLORS[color];

  return (
    <form action={createHabit} className="space-y-6 px-4 pt-2">
      <input type="hidden" name="icon" value={icon} />
      <input type="hidden" name="color" value={color} />
      <input type="hidden" name="frequency" value={frequency} />

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoFocus
          placeholder="e.g. Drink water"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-accent"
        />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-semibold">Frequency</span>
        <div className="flex gap-2">
          {(["daily", "weekly"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              aria-pressed={frequency === f}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize transition active:scale-95 ${
                frequency === f
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-card text-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-semibold">Icon</span>
        <div className="grid grid-cols-5 gap-2">
          {ICON_OPTIONS.map((key) => {
            const selected = icon === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setIcon(key)}
                aria-label={key}
                aria-pressed={selected}
                className="flex aspect-square items-center justify-center rounded-xl border transition active:scale-95"
                style={
                  selected
                    ? { borderColor: base, backgroundColor: tint, color: base }
                    : undefined
                }
              >
                <HabitIcon icon={key} className="size-5" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-semibold">Color</span>
        <div className="flex flex-wrap gap-3">
          {COLOR_OPTIONS.map((key) => {
            const selected = color === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setColor(key)}
                aria-label={key}
                aria-pressed={selected}
                className="flex size-9 items-center justify-center rounded-full transition active:scale-95"
                style={{ backgroundColor: HABIT_COLORS[key].base }}
              >
                {selected && (
                  <Check className="size-5 text-white" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-foreground py-3.5 text-base font-semibold text-background transition active:scale-95"
      >
        Create habit
      </button>
    </form>
  );
}
