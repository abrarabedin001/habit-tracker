# 01 — Architecture

## Tech stack

| Concern | Choice | Notes |
|---------|--------|-------|
| Framework | **Next.js 16 (App Router)** | React 19, Server Components, Route Handlers |
| Language | **TypeScript** | strict |
| Styling | **Tailwind CSS v4** | mobile-first, CSS-variable theming |
| Icons | **lucide-react** | matches the icon-driven reference UI |
| Database | **NeonDB (serverless Postgres)** | via `@neondatabase/serverless` |
| ORM | **Drizzle ORM** + `drizzle-kit` | type-safe schema + migrations |
| Auth | **better-auth** | email/password to start, Drizzle adapter |
| PWA | **Web manifest + service worker (Serwist)** | installable, offline shell |
| Package manager | **pnpm** | |
| Hosting | **Vercel** | Neon over HTTP fits serverless well |

### Why these

- **Neon + Drizzle**: Neon's HTTP/serverless driver works cleanly in Vercel's
  serverless/edge runtimes; Drizzle gives end-to-end types and first-class better-auth support.
- **better-auth**: framework-agnostic, owns its tables via the Drizzle adapter, easy to
  extend later (OAuth, passkeys) without re-architecting.
- **PWA-first**: the product requirement is "super responsive → installable PWA", so the
  app is designed mobile-first and ships a manifest + service worker.

## Project structure (target)

```
src/
  app/
    (auth)/                 # sign-in / sign-up routes (unauthenticated)
    (app)/                  # authenticated app shell
      page.tsx              # dashboard (today's habits + grids)
      layout.tsx            # bottom nav + top bar
    api/
      auth/[...all]/route.ts  # better-auth handler
    manifest.ts             # PWA manifest (Next metadata route)
    layout.tsx              # root layout, theme, viewport
    globals.css
  components/
    ui/                     # primitives (button, card, chip, sheet…)
    habits/                 # habit-card, contribution-grid, week-strip…
    nav/                    # bottom-nav, top-bar
  lib/
    auth.ts                 # better-auth server instance
    auth-client.ts          # better-auth React client
    db/
      index.ts              # Drizzle client (Neon)
      schema.ts             # app schema (habits, logs)
      auth-schema.ts        # better-auth generated tables
  styles/                   # theme tokens if needed
drizzle/                    # generated SQL migrations
plan/                       # this directory
public/                     # icons, manifest assets
```

## Runtime & data flow

- **Server Components** read habits/logs directly via Drizzle (no client fetch needed
  for initial render).
- **Mutations** (tick off, create habit) via **Server Actions** or Route Handlers,
  revalidating the dashboard.
- **Auth**: `better-auth` session checked in the `(app)` layout; unauthenticated users
  are redirected to `(auth)/sign-in`.

## Environments & config

Env vars (see `.env.example`):

```
DATABASE_URL=            # Neon pooled connection string
BETTER_AUTH_SECRET=      # openssl rand -base64 32
BETTER_AUTH_URL=         # http://localhost:3000 (or prod URL)
NEXT_PUBLIC_APP_URL=     # public base URL for the auth client
```

## Deployment

- **Vercel** for the Next.js app; **Neon** for Postgres.
- Migrations run via `drizzle-kit` (`pnpm db:migrate`) as a deploy step / manually.
- Docker is **optional** (a `Dockerfile` may be added later for self-hosting); the
  primary target is Vercel + Neon, so no container is required to run.
