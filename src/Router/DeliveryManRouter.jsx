

import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';

const DeliveryManRouter = ({ children }) => {
  const { user, loading,isDeliveryman } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && isDeliveryman) {
    return children; 
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default DeliveryManRouter;