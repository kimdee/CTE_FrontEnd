import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";

import useAuth from "./components/context/AuthContext";

import Login from "./components/authentication/Login";
import Home from "./components/dashboard/Home";

import Announcement from "./components/dashboard/Pages/Announcement";
import Profile from "./components/dashboard/Pages/Profile";

import CustomRoute from "./components/Routes/CustomRoute";
import { BrowserRouter as Router } from "react-router-dom";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

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

// const CustomRoute = () => {
//   const location = useLocation();
//   const { user } = useAuth();
// };

function App() {
  const theme = extendTheme({
    fonts: {
      heading: "Poppins, sans-serif",
      body: "Roboto, sans-serif",
    },
    colors: {
      blueCTE: {
        50: "#1C62BA",
        100: "#4332FA",
        500: "#2E23AE",
        900: "#110A61",
      },
      blueGrad:
        "linear-gradient(90deg, rgba(55,48,186,1) 0%, rgba(23,165,194,1) 100%)",
      orangeCTE: "#FABC4B",
      neonCTE: "#D2FA19",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <CustomRoute />
      </Router>
    </ChakraProvider>
  );
}

export default App;
