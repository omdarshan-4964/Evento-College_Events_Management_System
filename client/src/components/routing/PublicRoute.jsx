import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};
export default PublicRoute;