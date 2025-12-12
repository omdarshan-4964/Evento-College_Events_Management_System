import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Sparkles } from 'lucide-react';

import AdminDashboard from '../components/dashboard/AdminDashboard';
import ClubDashboard from '../components/dashboard/ClubDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const isClubAdmin = user?.role === 'club_admin' || user?.role === 'super_admin';

    const renderRoleDashboard = () => {
        switch (user?.role) {
            case 'super_admin':
                return <AdminDashboard />;
            case 'club_admin':
                return <ClubDashboard />;
            case 'student':
                return <StudentDashboard />;
            default:
                return <p>Loading dashboard...</p>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Dashboard</h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-300 font-medium">Welcome back, <span className="text-primary-600 dark:text-primary-400 font-bold">{user?.name}</span>! 👋</p>
                    </div>
                    {isClubAdmin && (
                        <motion.button 
                            onClick={() => navigate('/events/new')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                        >
                            <PlusCircle size={20} />
                            <span>New Event</span>
                            <Sparkles size={16} />
                        </motion.button>
                    )}
                </motion.div>
                
                {renderRoleDashboard()}
            </div>
        </div>
    );
};
export default DashboardPage;
