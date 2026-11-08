alter table public.bookings
  add column if not exists amount numeric(12, 2) not null default 0,
  add column if not exists customer_name text,
  add column if not exists service text,
  add column if not exists date date,
  add column if not exists time time,
  add column if not exists address text,
  add column if not exists status text not null default 'pending',
  add column if not exists bedrooms text,
  add column if not exists carpet_size text,
  add column if not exists moving_house_type text,
  add column if not exists moving_additional_services text[] not null default '{}'::text[],
  add column if not exists price_minimum numeric(12, 2),
  add column if not exists price_maximum numeric(12, 2),
  add column if not exists price_maximum_plus boolean not null default false,
  add column if not exists office_area_sqm numeric(12, 2),
  add column if not exists office_has_carpet boolean;

notify pgrst, 'reload schema';
