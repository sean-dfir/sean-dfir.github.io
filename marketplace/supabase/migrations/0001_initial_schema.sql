-- BloomPro initial schema
-- Run via: supabase db push  (after linking your project)

-- Extend auth.users with profile info
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('client', 'designer')),
  display_name text not null,
  avatar_url  text,
  location    text,
  created_at  timestamptz default now()
);

-- Designer-specific details
create table public.designers (
  profile_id       uuid primary key references public.profiles(id) on delete cascade,
  bio              text,
  years_experience int default 0,
  price_per_hour   numeric(10,2) not null default 75,
  styles           text[] default '{}',
  is_available     boolean default true,
  stripe_account_id text  -- for payouts
);

-- Portfolio images (stored in Supabase Storage bucket 'portfolio')
create table public.portfolio_items (
  id          uuid primary key default gen_random_uuid(),
  designer_id uuid not null references public.designers(profile_id) on delete cascade,
  image_url   text not null,
  caption     text,
  created_at  timestamptz default now()
);

-- Availability blocks
create table public.availability (
  id          uuid primary key default gen_random_uuid(),
  designer_id uuid not null references public.designers(profile_id) on delete cascade,
  date        date not null,
  start_time  time,
  end_time    time,
  is_available boolean default true,  -- false = blocked out
  unique (designer_id, date)
);

-- Bookings
create table public.bookings (
  id                      uuid primary key default gen_random_uuid(),
  client_id               uuid not null references public.profiles(id),
  designer_id             uuid not null references public.designers(profile_id),
  event_date              date not null,
  event_type              text not null,
  hours                   numeric(4,1) not null,
  notes                   text,
  status                  text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  total_amount            numeric(10,2) not null,
  service_fee             numeric(10,2) not null,
  stripe_payment_intent_id text,
  created_at              timestamptz default now()
);

-- Reviews (one per completed booking)
create table public.reviews (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid not null unique references public.bookings(id) on delete cascade,
  author_id   uuid not null references public.profiles(id),
  rating      int not null check (rating between 1 and 5),
  body        text,
  created_at  timestamptz default now()
);

-- ============================================================
-- Row-Level Security
-- ============================================================

alter table public.profiles      enable row level security;
alter table public.designers     enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.availability  enable row level security;
alter table public.bookings      enable row level security;
alter table public.reviews       enable row level security;

-- profiles: users can see all profiles, edit only their own
create policy "profiles_select_all"  on public.profiles for select using (true);
create policy "profiles_update_own"  on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own"  on public.profiles for insert with check (auth.uid() = id);

-- designers: public read, own write
create policy "designers_select_all" on public.designers for select using (true);
create policy "designers_write_own"  on public.designers for all using (auth.uid() = profile_id);

-- portfolio: public read, designer write
create policy "portfolio_select_all" on public.portfolio_items for select using (true);
create policy "portfolio_write_own"  on public.portfolio_items for all
  using (auth.uid() = designer_id);

-- availability: public read, designer write
create policy "avail_select_all" on public.availability for select using (true);
create policy "avail_write_own"  on public.availability for all
  using (auth.uid() = designer_id);

-- bookings: client or designer can see their own
create policy "bookings_own" on public.bookings for select
  using (auth.uid() = client_id or auth.uid() = designer_id);
create policy "bookings_insert_client" on public.bookings for insert
  with check (auth.uid() = client_id);
create policy "bookings_update_parties" on public.bookings for update
  using (auth.uid() = client_id or auth.uid() = designer_id);

-- reviews: public read, author write
create policy "reviews_select_all" on public.reviews for select using (true);
create policy "reviews_insert_own" on public.reviews for insert with check (auth.uid() = author_id);
