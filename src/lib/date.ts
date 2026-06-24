const ORDINAL = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "25th Jun" */
export function formatDayMonth(d: Date): string {
  return `${ORDINAL(d.getDate())} ${MONTHS[d.getMonth()]}`;
}

export function weekdayShort(d: Date): string {
  return WEEKDAYS[d.getDay()];
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** The 7 days of the week containing `d`, starting Monday. */
export function weekDays(d: Date): Date[] {
  const start = new Date(d);
  const day = (start.getDay() + 6) % 7; // 0 = Monday
  start.setDate(start.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(start);
    x.setDate(start.getDate() + i);
    return x;
  });
}
