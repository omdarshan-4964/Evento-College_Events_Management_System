import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Building, Calendar as CalendarIcon, ClipboardCheck, BarChart2, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';
import {Logo } from './Logo';


const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3">
            <Logo size="default" />
            <div>
              <span className="block text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Evento
              </span>
              <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                College Events Management System
              </span>
            </div>
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
