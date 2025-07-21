import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';

const SuperAdminRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return user.role === 'super_admin' ? children : <Navigate to="/dashboard" replace />;
};
export default SuperAdminRoute;