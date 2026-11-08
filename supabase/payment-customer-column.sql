alter table public.payments
  add column if not exists customer_id uuid
  references public.profiles(id)
  on delete set null;

notify pgrst, 'reload schema';
