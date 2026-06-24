# Personal Tracker

A mobile-first, installable (PWA) habit & personal tracker. Built with Next.js,
NeonDB (Postgres), Drizzle ORM, and better-auth. Inspired by the "TickOff" app.

> 📁 See [`plan/`](./plan) for the product vision, architecture, data model, and roadmap.
> The current state is **Phase 0 — Skeleton** (the dashboard renders mock data).

## Stack

- **Next.js 16** (App Router, React 19) + **TypeScript** + **Tailwind CSS v4**
- **NeonDB** (serverless Postgres) via **Drizzle ORM**
- **better-auth** (email/password) with the Drizzle adapter
- **PWA**: web manifest + theme/viewport metadata (offline service worker is Phase 3)
- Icons: **lucide-react** · Package manager: **pnpm**

## Getting started

```bash
pnpm install
cp .env.example .env        # then fill in the values
```

### Environment

| Var | What |
|-----|------|
| `DATABASE_URL` | Neon pooled Postgres connection string |
| `BETTER_AUTH_SECRET` | random secret — `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | app base URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_URL` | public base URL for the browser auth client |

### Database

The Drizzle schema lives in [`src/lib/db/`](./src/lib/db) (`schema.ts` for app
tables, `auth-schema.ts` for better-auth tables). To create the tables on Neon:

```bash
pnpm db:generate    # generate SQL migrations from the schema
pnpm db:migrate     # apply them to DATABASE_URL
# or, for rapid local iteration:
pnpm db:push        # push the schema directly (no migration files)
pnpm db:studio      # browse data
```

> The better-auth tables in `auth-schema.ts` can be regenerated any time with
> `pnpm dlx @better-auth/cli@latest generate` if the auth config changes.

### Run

```bash
pnpm dev            # http://localhost:3000
```

## Project layout

```
src/app/            # routes — (app) shell, api/auth handler, manifest
src/components/     # UI — nav/ and habits/
src/lib/            # auth, db (Drizzle), habits/ (palette, mock), date utils
plan/               # planning docs (read these first)
drizzle/            # generated migrations
```

## Deploy

Target is **Vercel** + **Neon**. Set the env vars in the Vercel project and run
migrations against the Neon database. Docker is optional (not required to run).
# habit-tracker
# habit-tracker
