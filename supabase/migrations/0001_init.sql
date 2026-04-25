-- GachiWork M1b initial schema + RLS policies
--
-- Run this in the Supabase Dashboard:
--   1. Open https://supabase.com/dashboard/project/<your-project>/sql/new
--   2. Paste this entire file
--   3. Click "Run"
--
-- The script is idempotent (safe to re-run) for table/policy creation,
-- and the seed inserts use ON CONFLICT DO NOTHING.

-- =============================================================================
-- 0. Required extensions
-- =============================================================================

create extension if not exists "uuid-ossp";

-- =============================================================================
-- 1. languages lookup table (read-only reference)
-- =============================================================================

create table if not exists public.languages (
  code text primary key,
  name text not null,
  name_native text not null
);

alter table public.languages enable row level security;

-- everyone can read the language list (it's not PII)
drop policy if exists "languages_select_all" on public.languages;
create policy "languages_select_all"
  on public.languages
  for select
  using (true);

-- write access via service role only (no policies for insert/update/delete)

insert into public.languages(code, name, name_native) values
  ('ko', 'Korean', '한국어'),
  ('en', 'English', 'English'),
  ('vi', 'Vietnamese', 'Tiếng Việt'),
  ('ne', 'Nepali', 'नेपाली'),
  ('km', 'Khmer', 'ខ្មែរ')
on conflict (code) do nothing;

-- =============================================================================
-- 2. profiles
--   Mirrors auth.users 1:1 via id. Only minimum fields for M1b.
--   Visa/nationality/employer are intentionally NOT here yet (Principle 2).
-- =============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  locale text not null default 'ko' references public.languages(code),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Anyone authenticated can read any profile (display_name + avatar are public).
-- We don't expose locale to other users; clients should not rely on it for others.
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
  on public.profiles
  for select
  to authenticated
  using (true);

-- Owner-only update.
drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Insert handled by the trigger below; no INSERT policy needed for end users.
-- (Trigger runs as definer so it bypasses RLS for the initial profile row.)

-- Auto-create a profile row when auth.users gets a new row.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, locale)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'locale', 'ko')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================================================
-- 3. posts
-- =============================================================================

create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  locale text not null references public.languages(code),
  title text not null,
  body text not null,
  industry text,        -- 'manufacturing' | 'agriculture' | 'construction' | ...
  country text,         -- author-declared origin tag, free text for now
  is_draft boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts(created_at desc);
create index if not exists posts_author_id_idx on public.posts(author_id);

alter table public.posts enable row level security;

-- Authenticated users can read any non-draft post.
drop policy if exists "posts_select_published" on public.posts;
create policy "posts_select_published"
  on public.posts
  for select
  to authenticated
  using (is_draft = false);

-- Authors can read their own drafts.
drop policy if exists "posts_select_own_drafts" on public.posts;
create policy "posts_select_own_drafts"
  on public.posts
  for select
  to authenticated
  using (author_id = auth.uid() and is_draft = true);

-- Authenticated users can insert posts only as themselves.
drop policy if exists "posts_insert_self" on public.posts;
create policy "posts_insert_self"
  on public.posts
  for insert
  to authenticated
  with check (author_id = auth.uid());

-- Authors can update/delete their own posts.
drop policy if exists "posts_update_own" on public.posts;
create policy "posts_update_own"
  on public.posts
  for update
  to authenticated
  using (author_id = auth.uid())
  with check (author_id = auth.uid());

drop policy if exists "posts_delete_own" on public.posts;
create policy "posts_delete_own"
  on public.posts
  for delete
  to authenticated
  using (author_id = auth.uid());

-- =============================================================================
-- 4. events (analytics / audit)
--   Writes only via service role (server actions explicitly use it where needed).
--   No SELECT policy: end users never read this table.
-- =============================================================================

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists events_created_at_idx on public.events(created_at desc);
create index if not exists events_type_idx on public.events(type);

alter table public.events enable row level security;
-- No policies = default deny for everyone except service role.
