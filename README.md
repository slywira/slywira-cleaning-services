# Slywira Cleaning Services

A React + Vite website for a cleaning service business with home, office, carpet, and move-out cleaning offerings.

## Run locally

```bash
npm install
npm run dev
```

## Demo login

Without Supabase configuration, the project runs as a front-end demo and stores
test data in browser `localStorage`.

- Admin: admin@slywira.com / admin123
- Customer: customer@slywira.com / customer123

Use these demo accounts only when Supabase is not configured.

## Supabase Auth and database

To enable Supabase-backed sign-in, signup, and password recovery, configure
`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (or
`VITE_SUPABASE_ANON_KEY`) in the local environment. Enable Supabase Auth email
signups and configure the Auth redirect URL allow-list to include the app URL
with the `?page=resetPassword` route (for example, `http://localhost:5173/?page=resetPassword`
for local development). Supabase sends the recovery email; the reset form uses
the verified recovery session to update the password.

The app's Supabase data queries must match the column names and row-level
security policies in your project. Existing demo-mode data in browser
`localStorage` is not migrated automatically.

Run [`supabase/profile-recovery.sql`](./supabase/profile-recovery.sql) in the
Supabase SQL Editor before enabling public signup. This installs the Auth
trigger that writes each new account to `public.profiles`, and the profile
recovery function used by signup when a session is immediately available.
New public signups receive the customer role; only a trusted admin assignment
in Supabase `app_metadata` can create an admin profile. Signup is disabled
when Supabase is not configured; it will not silently create browser-only
accounts.

For accounts created before the profile trigger was installed, run
[`supabase/profile-recovery.sql`](./supabase/profile-recovery.sql) in the SQL
Editor to add their missing profiles using the Auth user's UUID.

Admin users must be assigned `role: "admin"` in Supabase `app_metadata` by a
trusted server-side process or the Supabase dashboard; never expose a
service-role key in the browser. Public signup creates customer accounts only.

After confirming the live table columns and existing RLS policies, run
[`supabase/admin-crud.sql`](./supabase/admin-crud.sql) in the SQL Editor to add
admin policies for bookings, payments, enquiries, services, and profiles. The
script stops unless all five tables exist and already have RLS enabled. It
also creates a protected function for administrators to view customer email
addresses from Supabase Auth. It does not grant profile insertion or role
changes, and it does not delete Auth accounts; customer-account creation and
role assignment must remain a trusted server-side operation.

If booking requests report missing booking columns (for example, `amount`),
run [`supabase/booking-pricing-columns.sql`](./supabase/booking-pricing-columns.sql)
in the Supabase SQL Editor. It adds the pricing and service-detail columns used
by the booking form and asks PostgREST to reload its schema cache.
