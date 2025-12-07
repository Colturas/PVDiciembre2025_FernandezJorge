import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UnauthorizedAccess } from './ErrorPages';

export const PrivateRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.userType !== requiredRole) {
    return <UnauthorizedAccess />;
  }

  return children;
};
