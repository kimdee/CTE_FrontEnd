import { Navigate, useLocation, Outlet } from "react-router-dom";
import Login from "../authentication/Login";

const ProtectedAuthRoute = ({ user }) => {
  const location = useLocation();

  if (!user || user.loggedIn === undefined) {
    return <Login />;
  }

  if (user.loggedIn === true) {
    return <Navigate to="/h" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedAuthRoute;
