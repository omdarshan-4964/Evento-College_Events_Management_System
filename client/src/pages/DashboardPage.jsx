import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlusCircle } from 'lucide-react';

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
        <div className="container mx-auto p-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">Welcome back, {user?.name}!</p>
                </div>
                {isClubAdmin && (
                    <button 
                        onClick={() => navigate('/events/new')}
                        className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                    >
                        <PlusCircle size={20} />
                        <span>New Event</span>
                    </button>
                )}
            </div>
            
            {renderRoleDashboard()}
        </div>
    );
};
export default DashboardPage;
