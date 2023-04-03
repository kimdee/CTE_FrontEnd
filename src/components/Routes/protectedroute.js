import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "../authentication/Login";

const ProtectedRoute = ({ user }) => {
  const location = useLocation();

  if (user === null) {
    return <Login />;
  }

  if (user !== null && user.loggedIn === true) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
