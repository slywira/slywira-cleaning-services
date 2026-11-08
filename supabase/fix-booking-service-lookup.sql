create or replace function public.set_booking_price()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
declare
  service_price numeric(10, 2);
begin
  select s.id, s.price
  into new.service_id, service_price
  from public.services as s
  where s.is_active is true
    and (
      (new.service_id is not null and s.id = new.service_id)
      or (
        new.service_id is null
        and lower(btrim(s.service_name)) = lower(btrim(new.service))
      )
    )
  limit 1;

  if not found then
    raise exception 'This cleaning service is unavailable.';
  end if;

  new.total_price := service_price;
  new.status := 'pending';

  return new;
end;
$function$;