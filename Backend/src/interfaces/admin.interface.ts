export interface DashboardStats {
  users: {
    total: number;
    students: number;
    owners: number;
    admins: number;
  };

  properties: {
    total: number;
    available: number;
  };

  bookings: {
    total: number;
    pending: number;
    confirmed: number;
    rejected: number;
    cancelled: number;
    completed: number;
  };

  reviews: number;

  wishlists: number;

  notifications: number;
}