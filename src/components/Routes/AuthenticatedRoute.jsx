import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const AuthenticatedRoute = ({ component: RouteComponent, requieredRole }) => {
  const location = useLocation();
  const authData = useAuth();
  const isAuthenticated = authData.user !== null;

  if (
    isAuthenticated && (authData.role === "admin" || authData.role === requieredRole)
  ) {
    if (location.pathname === "/verify-email") {
      if (authData.user.emailVerified) {
        <Navigate to="/admin" replace={true} />;
      } else {
        return <RouteComponent />;
      }
    } else if (authData.user.emailVerified) {
      return <RouteComponent />;
    } else {
      return <Navigate to="/verify-email" replace={true} />;
    }
  }

  return <Navigate to="/login" replace={true} />;
};

export default AuthenticatedRoute;
