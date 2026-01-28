create table if not exists public.phone_deals (
  id uuid default gen_random_uuid() primary key,
  phone_id uuid references public.phones(id) on delete cascade not null,
  store_name text not null,
  price numeric not null,
  url text,
  logo_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.phone_deals enable row level security;

create policy "Public deals are viewable by everyone"
  on public.phone_deals for select to public
  using (true);

create policy "Deals are insertable by authenticated users"
  on public.phone_deals for insert to authenticated
  with check (true);

create policy "Deals are updateable by authenticated users"
  on public.phone_deals for update to authenticated
  using (true);

create policy "Deals are deletable by authenticated users"
  on public.phone_deals for delete to authenticated
  using (true);
