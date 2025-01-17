import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';

const AdminRouter = ({ children }) => {
  const { user, loading,isAdmin } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && isAdmin) {
    return children; 
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRouter;