create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  intent text not null check (intent in ('buy', 'rent', 'sell', 'invest')),
  property_slug text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified')),
  source text not null check (source in ('homepage', 'property-page')),
  received_at timestamptz not null default timezone('utc', now())
);

alter table public.leads enable row level security;

create policy "Public can insert leads"
on public.leads
for insert
to anon, authenticated
with check (true);

create policy "Authenticated users can read leads"
on public.leads
for select
to authenticated
using (true);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (category in ('sale', 'rent')),
  status text not null check (status in ('available', 'sold', 'rented')),
  featured boolean not null default false,
  price bigint not null,
  price_suffix text,
  location text not null,
  summary text not null,
  description text not null,
  features jsonb not null default '[]'::jsonb,
  amenities text[] not null default '{}',
  images text[] not null default '{}',
  coordinates jsonb not null,
  agent jsonb not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.properties enable row level security;

create policy "Public can read properties"
on public.properties
for select
to anon, authenticated
using (true);

create policy "Authenticated users can manage properties"
on public.properties
for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "Public can view property images"
on storage.objects
for select
to public
using (bucket_id = 'property-images');

create policy "Authenticated users can upload property images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'property-images');

create policy "Authenticated users can update property images"
on storage.objects
for update
to authenticated
using (bucket_id = 'property-images')
with check (bucket_id = 'property-images');

create policy "Authenticated users can delete property images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'property-images');

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text not null,
  content text not null,
  image text not null,
  author text not null default 'Alexiant Advisor',
  date text not null,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.blog_posts enable row level security;

create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (true);

create policy "Authenticated users can manage blog posts"
on public.blog_posts
for all
to authenticated
using (true)
with check (true);