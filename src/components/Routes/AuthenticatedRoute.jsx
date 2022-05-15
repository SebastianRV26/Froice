import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const AuthenticatedRoute = ({ component: RouteComponent, requieredRole }) => {
  const location = useLocation();
  const authData = useAuth();
  const isAuthenticated = authData.user !== null;

  // Primero ver si está autenticado, sino vayase al login
  if (isAuthenticated) {
    // Segundo es ver si el correo está verificado, sino esta verificado mandelo al verificar
    if (location.pathname === "/verify-email") {
      if (authData.user.emailVerified) {
        <Navigate to="/dashboard" replace={true} />;
      } else {
        return <RouteComponent />; // Mantener en verify email
      }
    } else if (authData.user.emailVerified) {
      // Si esta verificado, revisar si es admin o service y controlar acceso
      if (requieredRole === "both" || requieredRole === authData.role) {
        return <RouteComponent />;
      }
      // Sino cumple con los requisitos llevarlo a la home page
      <Navigate to="/dashboard" replace={true} />;
    } else {
      return <Navigate to="/verify-email" replace={true} />;
    }
  }

  return <Navigate to="/login" replace={true} />;
};

export default AuthenticatedRoute;
