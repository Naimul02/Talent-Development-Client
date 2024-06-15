import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isLoading] = useAdmin();
  const [isTeacher] = useTeacher();
  const location = useLocation();
  console.log("location", location);

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  if (user && isAdmin) {
    return children;
  }
  else if(user && isTeacher){
      return children
  }

  
  return <Navigate to="/" state={location} replace={true}></Navigate>;
};

export default AdminPrivateRoute;
