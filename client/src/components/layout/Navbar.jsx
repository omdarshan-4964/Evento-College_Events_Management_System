import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Building, Calendar as CalendarIcon, ClipboardCheck, BarChart2, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';
// Assuming your logo is in src/assets/logo.svg
import EventoLogo from '../../assets/logo.svg';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex-shrink-0">
            {/* Use the imported SVG logo */}
            <img src={EventoLogo} alt="Evento Logo" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                {/* Links for All Logged-in Users */}
                <Link to="/calendar" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <CalendarIcon size={18} /><span className="hidden sm:inline">Calendar</span>
                </Link>
                <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <LayoutDashboard size={18} /><span className="hidden sm:inline">Dashboard</span>
                </Link>

                {/* Student-Only Link */}
                {user?.role === 'student' && (
                    <Link to="/my-registrations" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ClipboardCheck size={18} /><span className="hidden sm:inline">My Registrations</span>
                    </Link>
                )}

                {/* Super Admin-Only Links */}
                {user?.role === 'super_admin' && (
                    <>
                        <Link to="/admin/users" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Users size={18} /><span className="hidden sm:inline">Users</span>
                        </Link>
                        <Link to="/admin/venues" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Building size={18} /><span className="hidden sm:inline">Venues</span>
                        </Link>
                        <Link to="/admin/analytics" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <BarChart2 size={18} /><span className="hidden sm:inline">Analytics</span>
                        </Link>
                    </>
                )}

                <button onClick={handleLogout} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
