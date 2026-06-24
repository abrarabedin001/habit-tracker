import { getHabitColor } from "@/lib/habits/palette";

/**
 * GitHub-style contribution grid. Renders the trailing history as a 7-row grid of
 * rounded squares, tinted to the habit color. See plan/04-ui-design.md.
 */
export function ContributionGrid({
  history,
  color,
  rows = 7,
}: {
  history: boolean[];
  color: string;
  rows?: number;
}) {
  const { base, tint } = getHabitColor(color);
  const cols = Math.ceil(history.length / rows);

  return (
    <div
      className="grid grid-flow-col gap-[3px]"
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      aria-hidden
    >
      {history.map((done, i) => (
        <span
          key={i}
          className="aspect-square rounded-[3px]"
          style={{ backgroundColor: done ? base : tint }}
        />
      ))}
    </div>
  );
}
