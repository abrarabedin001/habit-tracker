import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { HabitForm } from "@/components/habits/habit-form";

/** Create-habit screen. */
export default function NewHabitPage() {
  return (
    <div>
      <header className="flex items-center gap-2 px-3 pb-2 pt-4">
        <Link
          href="/"
          aria-label="Back"
          className="flex size-10 items-center justify-center rounded-full transition active:scale-95"
        >
          <ChevronLeft className="size-6" />
        </Link>
        <h1 className="text-xl font-extrabold tracking-tight">New habit</h1>
      </header>

      <HabitForm />
    </div>
  );
}
