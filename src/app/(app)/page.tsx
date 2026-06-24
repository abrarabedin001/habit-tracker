import Link from "next/link";
import { Plus } from "lucide-react";
import { TopBar } from "@/components/nav/top-bar";
import { WeekStrip } from "@/components/nav/week-strip";
import { HabitCard } from "@/components/habits/habit-card";
import { formatDayMonth, fromDateStr, toDateStr } from "@/lib/date";
import { requireUserId } from "@/lib/auth-helpers";
import { getDashboard } from "@/lib/habits/queries";

/**
 * Dashboard (Grid view). Renders the signed-in user's habits and their
 * completion state for the selected day (?date=YYYY-MM-DD, defaults to today).
 */
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const userId = await requireUserId();
  const { date } = await searchParams;

  const today = toDateStr(new Date());
  const selected = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : today;

  const { habits, completionPct } = await getDashboard(userId, selected);

  return (
    <div>
      <TopBar
        dateLabel={formatDayMonth(fromDateStr(selected))}
        completionPct={completionPct}
      />
      <WeekStrip selected={selected} today={today} />

      <div className="space-y-4 px-4 pt-1">
        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} selectedDate={selected} />
          ))
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 px-6 text-center">
      <p className="text-base font-semibold">No habits yet</p>
      <p className="text-sm text-muted">
        Add a habit to start tracking which days you complete it.
      </p>
      <Link
        href="/new"
        className="mt-1 inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition active:scale-95"
      >
        <Plus className="size-4" />
        Add a habit
      </Link>
    </div>
  );
}
