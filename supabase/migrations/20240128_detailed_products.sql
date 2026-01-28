-- Add missing columns for detailed product information
alter table public.phones 
add column if not exists images text[] default '{}',
add column if not exists description text,
add column if not exists colors text[] default '{}',
add column if not exists specs jsonb default '{}'::jsonb,
add column if not exists storage text,
add column if not exists compare_at_price numeric;
