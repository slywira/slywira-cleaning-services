import { getSupabaseClient } from "../supabaseClient";

const STORAGE_KEYS = {
  users: "slywira-demo-users",
  session: "slywira-demo-session",
  bookings: "slywira-demo-bookings",
  payments: "slywira-demo-payments",
  enquiries: "slywira-demo-enquiries",
  services: "slywira-demo-services",
};

const defaultUsers = [
  {
    id: "admin-1",
    fullName: "Slywira Admin",
    email: "admin@slywira.com",
    phone: "+254700000000",
    password: "admin123",
    role: "admin",
  },
  {
    id: "customer-1",
    fullName: "Jane Wanjiku",
    email: "customer@slywira.com",
    phone: "+254712345678",
    password: "customer123",
    role: "customer",
  },
  {
    id: "customer-2",
    fullName: "Daniel Muriuki",
    email: "daniel@example.com",
    phone: "+254723456789",
    password: "muriuki123",
    role: "customer",
  },
];

const defaultBookings = [
  {
    id: "BK-1001",
    customerId: "customer-1",
    customerName: "Jane Wanjiku",
    service: "Home Cleaning",
    date: "2026-11-10",
    time: "09:30",
    address: "Westlands, Nairobi",
    status: "confirmed",
    amount: 4200,
  },
  {
    id: "BK-1002",
    customerId: "customer-1",
    customerName: "Jane Wanjiku",
    service: "Office Cleaning",
    date: "2026-11-12",
    time: "14:00",
    address: "Kilimani, Nairobi",
    status: "pending",
    amount: 6800,
  },
  {
    id: "BK-1003",
    customerId: "customer-2",
    customerName: "Daniel Muriuki",
    service: "Carpet Cleaning",
    date: "2026-11-15",
    time: "11:00",
    address: "Riverside, Nairobi",
    status: "completed",
    amount: 5400,
  },
  {
    id: "BK-1004",
    customerId: "customer-2",
    customerName: "Daniel Muriuki",
    service: "Move-out Cleaning",
    date: "2026-11-18",
    time: "08:00",
    address: "Lavington, Nairobi",
    status: "cancelled",
    amount: 7600,
  },
];

const defaultPayments = [
  {
    id: "PAY-2001",
    customerId: "customer-1",
    customerName: "Jane Wanjiku",
    amount: 4200,
    method: "M-Pesa",
    status: "paid",
    date: "2026-11-09",
  },
  {
    id: "PAY-2002",
    customerId: "customer-1",
    customerName: "Jane Wanjiku",
    amount: 6800,
    method: "Bank Transfer",
    status: "pending",
    date: "2026-11-11",
  },
  {
    id: "PAY-2003",
    customerId: "customer-2",
    customerName: "Daniel Muriuki",
    amount: 5400,
    method: "Card",
    status: "paid",
    date: "2026-11-13",
  },
];

const defaultEnquiries = [
  {
    id: "ENQ-3001",
    customerName: "Grace Njeri",
    email: "grace@email.com",
    service: "Home Cleaning",
    message: "Need a deep cleaning service for 3-bedroom apartment.",
    status: "New",
  },
  {
    id: "ENQ-3002",
    customerName: "Joseph Otieno",
    email: "joseph@email.com",
    service: "Office Cleaning",
    message: "Looking for weekly cleaning plan for our office block.",
    status: "In Progress",
  },
  {
    id: "ENQ-3003",
    customerName: "Mary Karanja",
    email: "mary@email.com",
    service: "Carpet Cleaning",
    message: "We need urgent carpet cleaning for our reception area.",
    status: "Resolved",
  },
];

const defaultServices = [
  { name: "Home Cleaning", price: 4200, duration: "3 hours", status: "Available" },
  { name: "Office Cleaning", price: 6800, duration: "4 hours", status: "Popular" },
  { name: "Carpet Cleaning", price: 5400, duration: "2.5 hours", status: "Available" },
  { name: "Move-out Cleaning", price: 7600, duration: "5 hours", status: "Booked" },
];

function safeRead(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const json = window.localStorage.getItem(key);
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function ensureDemoData() {
  const users = safeRead(STORAGE_KEYS.users, defaultUsers);
  const bookings = safeRead(STORAGE_KEYS.bookings, defaultBookings);
  const payments = safeRead(STORAGE_KEYS.payments, defaultPayments);
  const enquiries = safeRead(STORAGE_KEYS.enquiries, defaultEnquiries);
  const services = safeRead(STORAGE_KEYS.services, defaultServices);

  if (!users.length) safeWrite(STORAGE_KEYS.users, defaultUsers);
  if (!bookings.length) safeWrite(STORAGE_KEYS.bookings, defaultBookings);
  if (!payments.length) safeWrite(STORAGE_KEYS.payments, defaultPayments);
  if (!enquiries.length) safeWrite(STORAGE_KEYS.enquiries, defaultEnquiries);
  if (!services.length) safeWrite(STORAGE_KEYS.services, defaultServices);

  return {
    users: users.length ? users : defaultUsers,
    bookings: bookings.length ? bookings : defaultBookings,
    payments: payments.length ? payments : defaultPayments,
    enquiries: enquiries.length ? enquiries : defaultEnquiries,
    services: services.length ? services : defaultServices,
  };
}

export function getDemoUsers() {
  return safeRead(STORAGE_KEYS.users, defaultUsers);
}

export function getDemoBookings() {
  return safeRead(STORAGE_KEYS.bookings, defaultBookings);
}

export function getDemoPayments() {
  return safeRead(STORAGE_KEYS.payments, defaultPayments);
}

export function getDemoEnquiries() {
  return safeRead(STORAGE_KEYS.enquiries, defaultEnquiries);
}

export function getDemoServices() {
  return safeRead(STORAGE_KEYS.services, defaultServices);
}

export function getCurrentUser() {
  const session = safeRead(STORAGE_KEYS.session, null);
  if (!session) return null;
  if (getSupabaseClient() && session.provider !== "supabase") return null;

  const users = getDemoUsers();
  return users.find((user) => user.id === session.id) || null;
}

export function setCurrentUser(user) {
  safeWrite(STORAGE_KEYS.session, {
    id: user.id,
    email: user.email,
    role: user.role,
  });
}

export function setSupabaseAuthUser(authUser, profile) {
  const user = {
    id: authUser.id,
    fullName: profile.fullName || authUser.user_metadata?.full_name || authUser.email || "",
    email: authUser.email || profile.email || "",
    phone: profile.phone || authUser.user_metadata?.phone || "",
    role: profile.role,
  };
  safeWrite(STORAGE_KEYS.users, [user]);
  safeWrite(STORAGE_KEYS.session, {
    id: user.id,
    email: user.email,
    role: user.role,
    provider: "supabase",
  });

  return user;
}

export function signOutDemoUser() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEYS.session);
  }
}

export function authenticateDemoUser({ email, password }) {
  ensureDemoData();

  const match = getDemoUsers().find(
    (user) =>
      user.email.toLowerCase() === String(email || "").trim().toLowerCase() &&
      user.password === String(password || "")
  );

  if (!match) {
    return { success: false, message: "Invalid email or password." };
  }

  const safeUser = { ...match };
  delete safeUser.password;
  setCurrentUser(safeUser);

  return { success: true, user: safeUser };
}

export function registerDemoUser({ fullName, email, phone, password }) {
  ensureDemoData();

  const users = getDemoUsers();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser = {
    id: `customer-${Date.now()}`,
    fullName: String(fullName || "").trim(),
    email: normalizedEmail,
    phone: String(phone || "").trim(),
    password: String(password || ""),
    role: "customer",
  };

  safeWrite(STORAGE_KEYS.users, [...users, newUser]);

  return { success: true, user: { ...newUser, password: undefined } };
}

export function getCustomerBookings(customerId) {
  return getDemoBookings().filter((booking) => booking.customerId === customerId);
}

export function getCustomerPayments(customerId) {
  return getDemoPayments().filter((payment) => payment.customerId === customerId);
}

export function getAdminDashboardStats() {
  const users = getDemoUsers();
  const bookings = getDemoBookings();
  const enquiries = getDemoEnquiries();
  const payments = getDemoPayments();

  return {
    totalBookings: bookings.length,
    totalCustomers: users.filter((user) => user.role === "customer").length,
    totalEnquiries: enquiries.length,
    totalRevenue: payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
  };
}

export function updateBookingStatus(bookingId, status) {
  const nextBookings = getDemoBookings().map((booking) =>
    booking.id === bookingId ? { ...booking, status } : booking
  );

  safeWrite(STORAGE_KEYS.bookings, nextBookings);
  return nextBookings;
}

export function updateEnquiryStatus(enquiryId, status) {
  const nextEnquiries = getDemoEnquiries().map((item) =>
    item.id === enquiryId ? { ...item, status } : item
  );

  safeWrite(STORAGE_KEYS.enquiries, nextEnquiries);
  return nextEnquiries;
}

export function createCustomerBooking({
  customerId,
  customerName,
  service,
  bedrooms,
  carpetSize,
  movingHouseType,
  movingAdditionalServices,
  priceMinimum,
  priceMaximum,
  priceMaximumPlus,
  officeAreaSqm,
  officeHasCarpet,
  date,
  time,
  address,
  amount,
}) {
  const bookings = getDemoBookings();
  const nextBooking = {
    id: `BK-${Date.now()}`,
    customerId,
    customerName,
    service,
    date,
    time,
    address,
    status: "pending",
    amount: Number(amount || 0),
    ...(service === "Home Cleaning" && { bedrooms }),
    ...(service === "Carpet Cleaning" && { carpetSize }),
    ...(service === "Move-out Cleaning" && {
      movingHouseType,
      movingAdditionalServices,
      priceMinimum,
      priceMaximum,
      priceMaximumPlus,
    }),
    ...(service === "Office Cleaning" && { officeAreaSqm, officeHasCarpet }),
  };

  safeWrite(STORAGE_KEYS.bookings, [nextBooking, ...bookings]);
  return nextBooking;
}

export { STORAGE_KEYS };
