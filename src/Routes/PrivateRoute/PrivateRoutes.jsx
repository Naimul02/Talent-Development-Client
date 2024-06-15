import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log("location" , location)

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace={true}></Navigate>;
};

export default PrivateRoutes;
