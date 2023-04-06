import { useContext } from "react";
import DataProvider from "../context/DataProvider.js";

//Custom hooks to use context data globally
const useAuth = () => {
  return useContext(DataProvider);
};

export default useAuth;
