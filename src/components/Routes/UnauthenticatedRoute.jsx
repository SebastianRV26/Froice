import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const UnauthenticatedRoute = ({ component: RouteComponent }) => {
  const authData = useAuth();
  const isAuthenticated = authData.user !== null;

  if (!isAuthenticated) {
    return <RouteComponent />;
  }

  return <Navigate to="/dashboard" replace={true} />;
};

export default UnauthenticatedRoute;
