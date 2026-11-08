do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'bookings',
    'payments',
    'enquiries',
    'services'
  ]
  loop
    if to_regclass(format('public.%I', table_name)) is null then
      raise exception 'Required table public.% is missing.', table_name;
    end if;

    if not exists (
      select 1
      from pg_class as relation
      join pg_namespace as schema on schema.oid = relation.relnamespace
      where schema.nspname = 'public'
        and relation.relname = table_name
        and relation.relrowsecurity
    ) then
      raise exception 'Row-level security must be enabled on public.% before granting admin access.', table_name;
    end if;
  end loop;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.get_admin_customer_emails()
returns table (customer_id uuid, email text)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (select public.is_admin()) then
    raise exception 'Administrator access is required.'
      using errcode = '42501';
  end if;

  return query
  select profiles.id, users.email::text
  from public.profiles as profiles
  join auth.users as users on users.id = profiles.id
  where profiles.role = 'customer';
end;
$$;

revoke all on function public.get_admin_customer_emails() from public, anon;
grant execute on function public.get_admin_customer_emails() to authenticated;

grant select, insert, update, delete
on public.bookings, public.payments, public.enquiries, public.services
to authenticated;

grant select, delete on public.profiles to authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

drop policy if exists "Admins have full CRUD access" on public.profiles;
create policy "Admins have full CRUD access"
on public.profiles
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins have full CRUD access" on public.bookings;
create policy "Admins have full CRUD access"
on public.bookings
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins have full CRUD access" on public.payments;
create policy "Admins have full CRUD access"
on public.payments
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins have full CRUD access" on public.enquiries;
create policy "Admins have full CRUD access"
on public.enquiries
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins have full CRUD access" on public.services;
create policy "Admins have full CRUD access"
on public.services
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));
