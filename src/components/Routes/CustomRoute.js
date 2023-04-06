import { lazy, Suspense, useState, useEffect } from 'react';

import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { GetRequest } from '../api/api.js';
import { User } from '../api/Path.js'

import Login from "../authentication/Login.js";
import PageNotFound from "../404/PageNotFound.js";
import ProtectedRoute from "./protectedroute.js";
import Home from "../dashboard/Home.js";
import useAuth from "../Hooks/AuthContext.js";
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

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user === null ? <Navigate to="/login" replace /> : <Outlet />;
};

const RedirectAuth = () => {
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(true);
  const { setUser } = useAuth();

  const handleFetch = () => {
    GetRequest({ url: User })
      .then(res => res.data)
      .then(res => {
        if (!res.data.status === 200) {
          throw new Error('Bad response', { cause: res });
        }

        const { data } = res;
        setUser(data);
        navigate('/', { replace: true });
      })
      .catch(_ => {
        setUser(null);
      });
  };

  useEffect(() => {
    handleFetch();
    return () => setFetch(false);
  }, [fetch]);
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
