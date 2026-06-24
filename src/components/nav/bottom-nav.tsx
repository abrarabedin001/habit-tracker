"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Crown, ScrollText } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Habits", icon: LayoutGrid },
  { href: "/premium", label: "Premium", icon: Crown, primary: true },
  { href: "/logs", label: "Logs", icon: ScrollText },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-10 border-t border-border bg-card/90 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-center justify-around px-6 py-2.5">
        {ITEMS.map(({ href, label, icon: Icon, primary }) => {
          const active = pathname === href;
          if (primary) {
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={label}
                  className="flex size-14 items-center justify-center rounded-2xl bg-foreground text-accent shadow-lg transition active:scale-95"
                >
                  <Icon className="size-7" />
                </Link>
              </li>
            );
          }
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                className={`flex size-12 items-center justify-center rounded-xl transition active:scale-95 ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                <Icon className="size-6" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
