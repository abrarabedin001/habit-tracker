import { TopBar } from "@/components/nav/top-bar";
import { WeekStrip } from "@/components/nav/week-strip";
import { HabitCard } from "@/components/habits/habit-card";
import { formatDayMonth } from "@/lib/date";
import { MOCK_HABITS, MOCK_COMPLETION_PCT } from "@/lib/habits/mock";

/**
 * Dashboard (Grid view). Renders mock data in Phase 0; swapped for real
 * per-user queries in Phase 1 (see plan/03-roadmap.md).
 */
export default function DashboardPage() {
  const today = new Date();

  return (
    <div>
      <TopBar
        dateLabel={formatDayMonth(today)}
        completionPct={MOCK_COMPLETION_PCT}
      />
      <WeekStrip />

      <div className="space-y-4 px-4 pt-1">
        {MOCK_HABITS.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
}
