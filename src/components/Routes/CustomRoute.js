import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import Login from "../authentication/Login.js";
import PageNotFound from "../404/PageNotFound.js";
import ProtectedRoute from "./protectedroute.js";
import Home from "../dashboard/Home.js";
import useAuth from "../context/AuthContext.js";
// import MyAccount from "../dashboard/Pages/MyAccount.js";
import RouteData from "../Routes/RouteData";
import ProtectedAuthRoute from "./protectedAuthRoute.js";

const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

const RedirectAuth = ({ user }) => {
  const location = useLocation();

  if (!user || user.loggedIn === undefined) {
    return <Login />;
  }

  if (user.loggedIn === true) {
    return <Navigate to="/h" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

const CustomRoute = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<RedirectAuth user={user} />}>
        <Route path="/" element={<Layout />}></Route>
      </Route>
      {/* Secure Routes */}
      {/* </Route> */}
      <Route element={<ProtectedRoute user={user} />}>
        <Route
          path="/h/*"
          element={
            <Home>
              <Routes>
                {RouteData.path.map((data) => {
                  return (
                    <Route
                      key={data.index}
                      path={data.href}
                      element={data.element}
                    />
                  );
                })}
              </Routes>
            </Home>
          }
        />
      </Route>

      {/* public authentication Routes */}
      <Route element={<ProtectedAuthRoute user={user} />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default CustomRoute;
