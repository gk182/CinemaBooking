import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../interfaces/User';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Public Pages
import HomePage from '../pages/Home/HomePage';
import MovieDetailPage from '../pages/MovieDetail/MovieDetailPage';

import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';

// User Pages
import ProfilePage from '../pages/User/ProfilePage';
import HistoryPage from '../pages/User/HistoryPage';
import TicketDetailPage from '../pages/User/TicketDetailPage';

// Booking Flow
import BookingPage from '../pages/Booking/BookingPage';
import PaymentPage from '../pages/Booking/PaymentPage';
import PaymentCallbackPage from '../pages/Booking/PaymentCallbackPage';

// Staff Pages
import StaffDashboard from '../pages/Staff/StaffDashboard';
import TodayShowtimesPage from '../pages/Staff/TodayShowtimesPage';
import CheckinPage from '../pages/Staff/CheckinPage';
import SearchOrderPage from '../pages/Staff/SearchOrderPage';

// Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard';
import MoviesPage from '../pages/Admin/MoviesPage';
import RoomsPage from '../pages/Admin/RoomsPage';
import ShowtimesPage from '../pages/Admin/ShowtimesPage';
import CinemasPage from '../pages/Admin/CinemasPage';
import StaffAccountsPage from '../pages/Admin/StaffAccountsPage';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />\
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="/booking/:showtimeId" element={<BookingPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route path="/payment/callback" element={<PaymentCallbackPage />} />
        </Route>

        {/* Staff Routes with Dashboard Layout */}
        <Route element={
          <RoleRoute allowedRoles={[UserRole.STAFF, UserRole.ADMIN]}>
            <DashboardLayout />
          </RoleRoute>
        }>
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/showtimes" element={<TodayShowtimesPage />} />
          <Route path="/staff/checkin" element={<CheckinPage />} />
          <Route path="/staff/orders" element={<SearchOrderPage />} />
        </Route>

        {/* Admin Routes with Dashboard Layout */}
        <Route element={
          <RoleRoute allowedRoles={[UserRole.ADMIN]}>
            <DashboardLayout />
          </RoleRoute>
        }>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/movies" element={<MoviesPage />} />
          <Route path="/admin/rooms" element={<RoomsPage />} />
          <Route path="/admin/showtimes" element={<ShowtimesPage />} />
          <Route path="/admin/cinemas" element={<CinemasPage />} />
          <Route path="/admin/staff" element={<StaffAccountsPage />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;