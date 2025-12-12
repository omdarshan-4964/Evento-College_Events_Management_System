import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Building, Calendar as CalendarIcon, ClipboardCheck, BarChart2, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';


const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Evento
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1.5">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:shadow-lg transition-all duration-300" title="Dashboard">
                  <LayoutDashboard size={18} /><span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Link to="/calendar" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-lg transition-all duration-300" title="Calendar">
                  <CalendarIcon size={18} /><span className="hidden lg:inline">Calendar</span>
                </Link>

                {user?.role === 'student' && (
                  <Link to="/my-registrations" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white hover:shadow-lg transition-all duration-300" title="My Registrations">
                    <ClipboardCheck size={18} /><span className="hidden xl:inline">Registrations</span>
                  </Link>
                )}

                {user?.role === 'super_admin' && (
                  <>
                    <Link to="/admin/users" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:shadow-lg transition-all duration-300" title="Users">
                      <Users size={18} /><span className="hidden xl:inline">Users</span>
                    </Link>
                    <Link to="/admin/venues" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 hover:text-white hover:shadow-lg transition-all duration-300" title="Venues">
                      <Building size={18} /><span className="hidden xl:inline">Venues</span>
                    </Link>
                    <Link to="/admin/analytics" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:shadow-lg transition-all duration-300" title="Analytics">
                      <BarChart2 size={18} /><span className="hidden xl:inline">Analytics</span>
                    </Link>
                  </>
                )}

                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent mx-2"></div>
                
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 hover:shadow-lg transition-all duration-300" title="Logout">
                  <LogOut size={18} /><span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : null}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
