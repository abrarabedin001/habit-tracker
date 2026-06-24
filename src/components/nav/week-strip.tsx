import Link from "next/link";
import { fromDateStr, toDateStr, weekDays, weekdayShort } from "@/lib/date";

/**
 * The week containing the selected day. Each day links to `/?date=…`, so the
 * dashboard re-queries that day's completion state. Today and the selected day
 * are highlighted distinctly.
 */
export function WeekStrip({
  selected,
  today,
}: {
  selected: string;
  today: string;
}) {
  const days = weekDays(fromDateStr(selected));

  return (
    <div className="flex justify-between gap-1 px-4 py-3">
      {days.map((d) => {
        const dStr = toDateStr(d);
        const active = dStr === selected;
        const isToday = dStr === today;
        return (
          <Link
            key={dStr}
            href={dStr === today ? "/" : `/?date=${dStr}`}
            scroll={false}
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
          </Link>
        );
      })}
    </div>
  );
}
