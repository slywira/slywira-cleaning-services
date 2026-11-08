import { getSupabaseClient } from "../supabaseClient";
import {
  getAdminDashboardStats as getDemoDashboardStats,
  getCustomerBookings as getDemoCustomerBookings,
  getCustomerPayments as getDemoCustomerPayments,
  getDemoBookings,
  getDemoEnquiries,
  getDemoPayments,
  getDemoServices,
  getDemoUsers,
  updateBookingStatus as updateDemoBookingStatus,
  updateEnquiryStatus as updateDemoEnquiryStatus,
  createCustomerBooking as createDemoBooking,
} from "./demoData";

function requireData(data, error) {
  if (error) throw new Error(error.message);
  return data;
}

function mapProfile(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email || "",
    phone: row.phone,
    role: row.role,
  };
}

export async function getAppProfile(authUser) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  let { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("id", authUser.id)
    .maybeSingle();
  if (error) throw new Error(error.message);

  if (!data) {
    const { error: provisionError } = await supabase.rpc("ensure_my_profile");
    if (provisionError) {
      throw new Error(
        `No profile matches this Supabase account, and automatic profile setup failed: ${provisionError.message}. Run supabase/profile-recovery.sql in the Supabase SQL Editor.`
      );
    }

    const profileResult = await supabase
      .from("profiles")
      .select("id, full_name, phone, role")
      .eq("id", authUser.id)
      .single();
    data = requireData(profileResult.data, profileResult.error);
  }

  const profile = data;
  if (!["admin", "customer"].includes(profile.role)) {
    throw new Error("The matching profile must have role set to admin or customer.");
  }
  return { ...mapProfile(profile), email: authUser.email || "" };
}

function mapBooking(row) {
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    service: row.service,
    date: row.booking_date ?? row.date,
    time: row.booking_time ?? row.time,
    address: row.address,
    status: row.status === "approved" ? "confirmed" : row.status,
    amount: Number(row.amount || 0),
    bedrooms: row.bedrooms,
    carpetSize: row.carpet_size,
    movingHouseType: row.moving_house_type,
    movingAdditionalServices: row.moving_additional_services || [],
    priceMinimum: row.price_minimum == null ? undefined : Number(row.price_minimum),
    priceMaximum: row.price_maximum == null ? undefined : Number(row.price_maximum),
    priceMaximumPlus: row.price_maximum_plus,
    officeAreaSqm: row.office_area_sqm == null ? undefined : Number(row.office_area_sqm),
    officeHasCarpet: row.office_has_carpet,
  };
}

function mapPayment(row) {
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    amount: Number(row.amount || 0),
    method: row.method,
    status: row.status,
    date: row.date,
  };
}

function mapEnquiry(row) {
  return {
    id: row.id,
    customerName: row.customer_name,
    email: row.email,
    service: row.service,
    message: row.message,
    status: row.status,
  };
}

function mapService(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price || 0),
    priceDescription: row.price_description,
    duration: row.duration,
    status: row.status,
  };
}

export async function getAppCustomers() {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoUsers().filter((user) => user.role === "customer");

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("role", "customer");
  return requireData(data, error).map(mapProfile);
}

export async function getAppCustomerEmails() {
  const supabase = getSupabaseClient();
  if (!supabase) return {};

  const { data: emailRows, error: emailError } = await supabase.rpc(
    "get_admin_customer_emails"
  );
  return Object.fromEntries(
    requireData(emailRows, emailError).map(({ customer_id, email }) => [customer_id, email])
  );
}

export async function getAppBookings() {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoBookings();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return requireData(data, error).map(mapBooking);
}

export async function getAppCustomerBookings(customerId) {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoCustomerBookings(customerId);

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return requireData(data, error).map(mapBooking);
}

export async function getAppPayments() {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoPayments();

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });
  return requireData(data, error).map(mapPayment);
}

export async function getAppCustomerPayments(customerId) {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoCustomerPayments(customerId);

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return requireData(data, error).map(mapPayment);
}

export async function getAppEnquiries() {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoEnquiries();

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  return requireData(data, error).map(mapEnquiry);
}

export async function updateAppEnquiryStatus(id, status) {
  const supabase = getSupabaseClient();
  if (!supabase) return updateDemoEnquiryStatus(id, status);

  const { data, error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();
  return mapEnquiry(requireData(data, error));
}

export async function getAppServices() {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoServices();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("name");
  return requireData(data, error).map(mapService);
}

export async function getAppDashboardStats() {
  const supabase = getSupabaseClient();
  if (!supabase) return getDemoDashboardStats();

  const [customers, bookings, enquiries, payments] = await Promise.all([
    getAppCustomers(),
    getAppBookings(),
    getAppEnquiries(),
    getAppPayments(),
  ]);
  return {
    totalBookings: bookings.length,
    totalCustomers: customers.length,
    totalEnquiries: enquiries.length,
    totalRevenue: payments.reduce((sum, payment) => sum + payment.amount, 0),
  };
}

export async function createAppBooking(booking) {
  const supabase = getSupabaseClient();
  if (!supabase) return createDemoBooking(booking);

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      customer_id: booking.customerId,
      customer_name: booking.customerName,
      service: booking.service,
      booking_date: booking.date,
      booking_time: booking.time,
      date: booking.date,
      time: booking.time,
      address: booking.address,
      amount: booking.amount,
      bedrooms: booking.bedrooms,
      carpet_size: booking.carpetSize,
      moving_house_type: booking.movingHouseType,
      moving_additional_services: booking.movingAdditionalServices,
      price_minimum: booking.priceMinimum,
      price_maximum: booking.priceMaximum,
      price_maximum_plus: booking.priceMaximumPlus,
      office_area_sqm: booking.officeAreaSqm,
      office_has_carpet: booking.officeHasCarpet,
    })
    .select("*")
    .single();
  return mapBooking(requireData(data, error));
}

export async function updateAppBookingStatus(id, status) {
  const supabase = getSupabaseClient();
  if (!supabase) return updateDemoBookingStatus(id, status);

  const { data, error } = await supabase
    .from("bookings")
    .update({ status: status === "confirmed" ? "approved" : status })
    .eq("id", id)
    .select("*")
    .single();
  return mapBooking(requireData(data, error));
}
