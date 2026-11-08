create or replace function public.ensure_my_profile()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  auth_user auth.users%rowtype;
  profile_role text;
begin
  if current_user_id is null then
    raise exception 'Authentication is required to create a profile.';
  end if;

  select *
  into auth_user
  from auth.users
  where id = current_user_id;

  if not found then
    raise exception 'No authenticated account was found.';
  end if;

  profile_role := case
    when coalesce(auth_user.raw_app_meta_data ->> 'role', '') = 'admin' then 'admin'
    else 'customer'
  end;

  insert into public.profiles (id, full_name, phone, role)
  values (
    current_user_id,
    coalesce(auth_user.raw_user_meta_data ->> 'full_name', auth_user.email, ''),
    coalesce(auth_user.raw_user_meta_data ->> 'phone', ''),
    profile_role
  )
  on conflict (id) do update
  set full_name = case
        when excluded.full_name <> '' then excluded.full_name
        else public.profiles.full_name
      end,
      phone = case
        when excluded.phone <> '' then excluded.phone
        else public.profiles.phone
      end,
      role = case
        when excluded.role = 'admin' then 'admin'
        else public.profiles.role
      end;
end;
$$;

revoke all on function public.ensure_my_profile() from public, anon;
grant execute on function public.ensure_my_profile() to authenticated;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_role text;
begin
  profile_role := case
    when coalesce(new.raw_app_meta_data ->> 'role', '') = 'admin' then 'admin'
    else 'customer'
  end;

  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    profile_role
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute procedure public.create_profile_for_new_user();

insert into public.profiles (id, full_name, phone, role)
select
  users.id,
  coalesce(users.raw_user_meta_data ->> 'full_name', users.email, ''),
  coalesce(users.raw_user_meta_data ->> 'phone', ''),
  case
    when coalesce(users.raw_app_meta_data ->> 'role', '') = 'admin' then 'admin'
    else 'customer'
  end
from auth.users as users
on conflict (id) do nothing;
