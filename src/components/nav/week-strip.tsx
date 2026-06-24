"use client";

import { useState } from "react";
import { isSameDay, weekDays, weekdayShort } from "@/lib/date";

export function WeekStrip() {
  const today = new Date();
  const [selected, setSelected] = useState(today);
  const days = weekDays(today);

  return (
    <div className="flex justify-between gap-1 px-4 py-3">
      {days.map((d) => {
        const active = isSameDay(d, selected);
        const isToday = isSameDay(d, today);
        return (
          <button
            key={d.toISOString()}
            type="button"
            onClick={() => setSelected(d)}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <span
              className={`text-xs font-medium ${
                isToday ? "text-foreground" : "text-muted"
              }`}
            >
              {weekdayShort(d)}
            </span>
            <span
              className={`flex size-11 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                active
                  ? "border-accent text-foreground"
                  : "border-border text-foreground/80"
              }`}
            >
              {d.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
