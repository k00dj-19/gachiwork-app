# RSC + Supabase Rules of the Road

These three rules exist because Supabase's security model relies on **RLS (Row Level Security)**, not on the API surface. A single misuse of the wrong client or the wrong key bypasses every policy and exposes PII for E-9 workers (visa status, employer, case descriptions). Read these before touching any Supabase call.

## Rule 1 — Only server components or route handlers may call Supabase with the user's JWT

The user's auth context lives in cookies set by `@supabase/ssr`. Those cookies only exist in **server context**.

- ✅ Server components (`async function Page()`)
- ✅ Route handlers (`app/api/*/route.ts`)
- ✅ Server actions (`"use server"` files)
- ❌ Client components (`"use client"`) — they cannot read the auth cookie, so any Supabase call from them either runs anonymous (RLS blocks it) or worse, gets passed the service-role key (bypasses RLS entirely)

If a client component needs data, fetch it in the parent server component and pass it down as props, or call a route handler from the client.

## Rule 2 — `SUPABASE_SERVICE_ROLE_KEY` is import-banned outside `app/api/admin/*`

The service-role key bypasses every RLS policy. It exists for legitimate admin operations (cron jobs, manual data migrations, the M4 `decrypt_case` RPC).

- ✅ `app/api/admin/*/route.ts` — service-role allowed, with explicit auth check at top of handler
- ❌ Anywhere else under `app/`, `src/`, or imported from a client component
- ❌ Never bundled to the browser (Vercel scopes server env vars to server runtime; do **not** prefix with `NEXT_PUBLIC_`)

A CI grep guard fails the build if `SUPABASE_SERVICE_ROLE_KEY` is referenced under `src/app/` outside `src/app/api/admin/`. The guard is **not malice-grade** (a determined attacker can write `process.env['SUPABASE_' + 'SERVICE_ROLE_KEY']`) — it catches accidents, which is the actual threat model for a solo developer.

## Rule 3 — Every Supabase query has a corresponding RLS test

The plan's M1b adds a Vitest 4-persona suite (`userA`, `userB`, `anon`, `admin`) that runs against the `*-test` Supabase project on every PR.

When you add a new table or a new query path:

1. Add the RLS policy in a Supabase migration (default deny if the table is new).
2. Add a test in `tests/rls/` covering all four personas: who can read, who can write, who is denied.
3. The test must include at least one **negative assertion** (e.g., `userA cannot read userB's row`).
4. Tests run in CI; failure on `main` blocks all merges.

If you skip step 2, the RLS policy is fiction — the policy might be correct, broken, or absent, and you have no way to tell. The test is what makes the policy real.

---

## Quick checklist before merging a Supabase-touching PR

- [ ] Did this PR add a table or a query? → RLS test added in `tests/rls/`
- [ ] Is the new query called from a server component / route handler? (not a client component)
- [ ] Does this PR reference `SUPABASE_SERVICE_ROLE_KEY`? → Only in `app/api/admin/*`
- [ ] Did the CI grep guard pass? → If it failed, the file is in the wrong directory or the wrong client is being used
