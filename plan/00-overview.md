# 00 — Product Overview

## Vision

A personal habit tracker that feels like a native mobile app but lives on the web,
so it can be installed as a **Progressive Web App (PWA)** on any phone or desktop and
used offline-first. Inspired by the **TickOff** reference screenshots.

## Target user

A single person (initially the author) who wants to build and maintain daily/weekly
habits — reading, exercise, learning, etc. — and see streaks and history at a glance.
Multi-user is supported via auth from day one, but the UX is designed for personal use.

## Core concept

The app revolves around **habits** and **completions**:

- A **habit** has a name, an icon, a color, and a **frequency** (daily or weekly).
- Each day/week the user **ticks off** the habit when done.
- The app tracks **streaks** and renders a **GitHub-style contribution grid** of history.
- Habits can be filtered (e.g. "All", category chips) and viewed in different layouts
  (Grid / List / Agenda — see [04-ui-design.md](./04-ui-design.md)).

## What the reference screenshots tell us (feature inventory)

From the TickOff screenshots, the target feature set is:

1. **Top bar** — "Today, 25th Jun", a daily completion percentage (e.g. `5.8%`), settings gear.
2. **Week strip** — Mon–Sun date circles; the selected/today day is highlighted.
3. **Filter chips** — "All", plus category chips (e.g. "Test").
4. **Habit cards** — icon, title, streak text ("Streak: 1 day" / "0 weeks"),
   a note/attachment button, and a complete (✓) button. Card-colored.
5. **Contribution grid** — per-habit colored grid of historical completions.
6. **Bottom nav** — three tabs (dashboard / premium-crown / logs-or-stats).
7. **Layout switch** — Grid View, List View, Agenda View ("only habits due today").
8. **Theme** — System / Light / Dark.
9. **Settings** — Cloud Backup, Export Data, Import Data, Share, Feedback, etc.
10. **Streak-based grid** view vs concise **list** view (with "All (3)" / "Due (0)" tabs).

## Explicit non-goals (for now)

- Social features / following other users.
- Native app store distribution (PWA install is the distribution channel).
- Complex analytics dashboards beyond streaks + the contribution grid.
- Payments / "Ultimate" tier (kept as a future placeholder, not built).
