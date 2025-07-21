import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;




