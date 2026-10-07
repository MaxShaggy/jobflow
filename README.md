# JobFlow

A personal job application tracker with a kanban board, company insights and statistics.

**Live demo:** [jobflow-sable.vercel.app](https://jobflow-sable.vercel.app)

> Demo account: `demo@example.com` / `demo12345`
>
> The demo account is shared, so data may be changed by other visitors.


## Features

- **Kanban board** — drag-and-drop applications between statuses, with optimistic updates and rollback on error
- **Search** — filter applications by company on the board and in the archive
- **Archive** — all rejected applications in one place, with the option to move one back to interview
- **Companies** — top-rated companies and a "red flag" list with user-submitted reviews
- **Statistics** — totals, counts by status, rejection rate, average applications per day
- **Authentication** — email/password sign-up and login, private data per user (Supabase RLS)
- **Dark / light theme**

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres, Auth, RLS) · shadcn/ui (Base UI) · dnd-kit · Vercel

## Getting Started

```bash
git clone https://github.com/MaxShaggy/jobflow.git
cd jobflow
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

```bash
npm run dev
```

## Roadmap

- [ ] EN / UA language switching
- [ ] Onboarding hints for an empty board
- [ ] About page