import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';

const ClubAdminRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // Allow access if the user is a club_admin or a super_admin
    const isAuthorized = user.role === 'club_admin' || user.role === 'super_admin';
    
    return isAuthorized ? children : <Navigate to="/dashboard" replace />;
};

export default ClubAdminRoute;
