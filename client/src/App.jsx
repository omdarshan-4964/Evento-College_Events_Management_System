import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PublicRoute from './components/routing/PublicRoute';
import SuperAdminRoute from './components/routing/SuperAdminRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import DashboardPage from './Pages/DashboardPage';

import VenueManagementPage from './pages/admin/VenueManagementPage';
import ClubAdminRoute from './components/routing/ClubAdminRoute';
import CreateEventPage from './pages/events/CreateEventPage';
import NewBookingPage from './pages/bookings/NewBookingPage';
import CalendarPage from './pages/CalendarPage';
import EditBookingPage from './pages/bookings/EditBookingPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import UserManagementPage from './pages/admin/UserManagementPage';

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/', '/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
          
          {!shouldHideNavbar && <Navbar />}

          <main>
            <Routes>
              <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
              <Route path="/my-registrations" element={<ProtectedRoute><MyRegistrationsPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/admin/venues" element={<SuperAdminRoute><VenueManagementPage /></SuperAdminRoute>} />
              <Route path="/events/new" element={<ClubAdminRoute><CreateEventPage /></ClubAdminRoute>} />
              <Route path="/bookings/new" element={<ClubAdminRoute><NewBookingPage/></ClubAdminRoute>} />
              <Route path="/calendar" element={<ProtectedRoute> <CalendarPage/> </ProtectedRoute>} />
              <Route path="/bookings/:id/edit" element={<ClubAdminRoute><EditBookingPage /></ClubAdminRoute>} />
              <Route path="/admin/analytics" element={<SuperAdminRoute> <AnalyticsPage /> </SuperAdminRoute>} />
              <Route path='/admin/users' element={<SuperAdminRoute> <UserManagementPage/> </SuperAdminRoute>} /> 
              

              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
