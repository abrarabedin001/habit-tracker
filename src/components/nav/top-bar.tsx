import Link from "next/link";
import { Gauge, Settings } from "lucide-react";

export function TopBar({
  dateLabel,
  completionPct,
}: {
  dateLabel: string;
  completionPct: number;
}) {
  return (
    <header className="flex items-center justify-between gap-3 px-5 pb-2 pt-4">
      <h1 className="text-2xl font-extrabold tracking-tight">
        Today,{" "}
        <span className="font-bold text-muted">{dateLabel}</span>
      </h1>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-sm font-semibold">
          <Gauge className="size-5" />
          {completionPct.toFixed(1)}%
        </span>
        <Link
          href="/settings"
          aria-label="Settings"
          className="flex size-10 items-center justify-center rounded-full bg-card border border-border transition active:scale-95"
        >
          <Settings className="size-5" />
        </Link>
      </div>
    </header>
  );
}
