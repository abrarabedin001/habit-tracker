# 04 — UI / Design System

Derived from the **TickOff** reference screenshots. Mobile-first; the same layout
scales up to desktop by centering the app in a phone-width column.

## Layout principles

- **Phone-first column**: app content is capped at ~`max-w-md` and centered on large
  screens, so the mobile design is the canonical design.
- **Three zones**: sticky **top bar**, scrollable **content**, fixed **bottom nav**.
- Generous rounded corners (`rounded-2xl`/`3xl`), soft shadows, lots of whitespace.

## Top bar

- Left: `Today, 25th Jun` — "Today" bold, date in muted weight.
- Right: daily completion **percentage** pill with a gauge icon, then a **settings** gear.

## Week strip

- Seven day circles `Mon…Sun` with the date number.
- Today / selected day: highlighted ring (reference uses a yellow ring).
- Horizontally scrollable to move across weeks.

## Filter chips

- Pill toggles: `All` (selected = filled), plus category chips (e.g. `Test`).
- List view uses `All (n)` / `Due (n)` count tabs instead.

## Habit card

- Rounded card, subtle border/shadow.
- Row: circular **icon** badge (tinted to the habit color) · **title** + **streak**
  subtitle · **note** button (document+) · **complete** check button.
- Check button states: incomplete (tinted/outline) → complete (solid color ✓).
- Below the row (Grid view only): the **contribution grid**.

## Contribution grid

- A GitHub-style grid of small rounded squares (≈7 rows × N columns).
- Empty cells use a faint tint of the habit color; filled cells use full color.
- Each habit's grid is tinted to that habit's color (indigo, teal, slate in the refs).

## Bottom nav

- Three items; the center is an elevated/active square (crown = premium placeholder).
- Icons only (dashboard grid · crown · logs/stats).

## Views (layout switch)

- **Grid View** — cards with contribution grids (the hero view).
- **List View** — compact cards, no grid, with `All`/`Due` tabs.
- **Agenda View** — only habits due today.

## Theme

- Tokens via CSS variables in `globals.css`; **System / Light / Dark**.
- Habit colors are a small named palette (indigo, teal, slate, amber, rose, …),
  each with a `base` and a `muted` (grid-empty) shade.

## Color palette (starting point)

| Token | Light | Dark |
|-------|-------|------|
| `--background` | near-white `#f7f7f8` | near-black `#0b0b0c` |
| `--card` | `#ffffff` | `#161618` |
| `--foreground` | `#0b0b0c` | `#f3f3f4` |
| `--muted` | `#6b7280` | `#9ca3af` |
| `--accent` (brand) | amber `#f5b301` | amber `#f5b301` |

Habit palette (each used at full + ~12% tint):
`indigo #4f46e5`, `teal #14b8a6`, `slate #64748b`, `amber #f59e0b`,
`rose #f43f5e`, `violet #8b5cf6`, `emerald #10b981`, `sky #0ea5e9`.

## Iconography

- `lucide-react` throughout. Habit icons stored as lucide keys
  (e.g. `graduation-cap`, `image`, `moon`, `dumbbell`, `book-open`).

## Accessibility / feel

- Tap targets ≥ 44px. Respect `prefers-reduced-motion`.
- Optimistic UI on tick-off; haptic-like micro-animation on complete.
- Safe-area insets for installed PWA (`env(safe-area-inset-*)`).
