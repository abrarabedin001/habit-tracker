"use client";

import { useOptimistic, useTransition } from "react";
import { Check, FilePlus2 } from "lucide-react";
import { getHabitColor } from "@/lib/habits/palette";
import type { HabitView } from "@/lib/habits/types";
import { toggleCompletion } from "@/lib/habits/actions";
import { HabitIcon } from "./habit-icon";
import { ContributionGrid } from "./contribution-grid";

/**
 * Habit card: icon · title + streak · note button · complete toggle, with the
 * contribution grid below. The toggle writes a `habit_log` for `selectedDate`
 * via a server action, updating optimistically while the action runs.
 */
export function HabitCard({
  habit,
  selectedDate,
  showGrid = true,
}: {
  habit: HabitView;
  selectedDate: string;
  showGrid?: boolean;
}) {
  const { base, tint } = getHabitColor(habit.color);
  const [, startTransition] = useTransition();
  const [done, setDone] = useOptimistic(habit.completedToday);

  function toggle() {
    startTransition(async () => {
      setDone(!done);
      await toggleCompletion(habit.id, selectedDate);
    });
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: tint, color: base }}
        >
          <HabitIcon icon={habit.icon} className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold">{habit.name}</h3>
          <p className="text-sm text-muted">{habit.streakLabel}</p>
        </div>

        <button
          type="button"
          aria-label="Add note"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground/80 transition active:scale-95"
        >
          <FilePlus2 className="size-5" />
        </button>

        <button
          type="button"
          aria-label={done ? "Mark incomplete" : "Mark complete"}
          aria-pressed={done}
          onClick={toggle}
          className="flex size-11 items-center justify-center rounded-full transition active:scale-95"
          style={
            done
              ? { backgroundColor: base, color: "#fff" }
              : { backgroundColor: tint, color: base }
          }
        >
          <Check className="size-6" strokeWidth={3} />
        </button>
      </div>

      {showGrid && (
        <div className="mt-4">
          <ContributionGrid history={habit.history} color={habit.color} />
        </div>
      )}
    </article>
  );
}
