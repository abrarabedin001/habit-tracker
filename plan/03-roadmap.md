# 03 — Roadmap

Status legend: ✅ Built · 🚧 In progress · ⬜ Planned

Keep this file honest — it is the quick answer to "what's done?".

## Phase 0 — Skeleton (current)

Goal: a running, deployable shell with the stack wired and the UI scaffolded.

- ✅ Next.js 16 + TypeScript + Tailwind v4 scaffold (App Router, `src/`)
- ✅ `plan/` directory with planning docs
- ✅ Dependencies installed (Drizzle, Neon, better-auth, lucide-react)
- ✅ Drizzle client + app schema (`habit`, `habit_log`) + `drizzle.config.ts`
- ✅ better-auth server + client + route handler (`/api/auth/[...all]`)
- ✅ PWA manifest (`app/manifest.ts`) + viewport/theme metadata + app icons
- ✅ Mobile-first UI skeleton: root + `(app)` shell, top bar, week strip,
  bottom nav, habit card, contribution grid (mock data)
- ✅ `.env.example` + README env/DB setup + `db:*` scripts
- ✅ `pnpm build` and `pnpm lint` pass clean

> **Note:** Serwist (offline service worker) deferred to Phase 3; Phase 0 ships the
> installable manifest + metadata only.

## Phase 1 — Auth + real data

- ⬜ Generate better-auth tables, run first migration on Neon
- ⬜ Sign-up / sign-in / sign-out pages, session guard on `(app)`
- ⬜ CRUD: create / edit / archive a habit
- ⬜ Tick-off mutation (server action) writing `habit_log` with `unique(habit_id, date)`
- ⬜ Replace mock dashboard data with real per-user queries

## Phase 2 — Tracking UX

- ⬜ Streak computation (daily + weekly) and display
- ⬜ Daily completion % in top bar
- ⬜ Contribution grid from real logs (trailing window)
- ⬜ Week strip navigation (select past days, see that day's state)
- ⬜ Filter chips by category; "All / Due" tabs
- ⬜ Layout switch: Grid / List / Agenda views

## Phase 3 — Polish & PWA

- ⬜ Serwist service worker: offline app shell + cached assets
- ⬜ Install prompt / "Add to Home Screen" UX
- ⬜ Theme switch (System / Light / Dark) persisted
- ⬜ Per-entry notes UI (the note/attachment button)
- ⬜ Empty states, loading skeletons, optimistic tick-off

## Phase 4 — Data portability & extras

- ⬜ Export data (JSON/CSV)
- ⬜ Import data
- ⬜ Reminders (local notifications via PWA)
- ⬜ Optional: OAuth / passkey login
- ⬜ Optional: Dockerfile for self-hosting

## Open questions / decisions to revisit

- Notes: plain text vs. real file attachments (affects schema + storage choice).
- Categories: string field vs. dedicated table (start as string).
- Timezone handling for streaks across travel (anchor-date approach chosen for now).
