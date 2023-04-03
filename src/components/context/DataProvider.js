import { createContext, useState, useEffect } from "react";
import api from "../api/api";

import {
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
} from "../api/Authentication_Request";

import { UserAllGetRequest } from "../api/User_Request";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [authException, setAuthException] = useState("Error");

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [fetch, setFetch] = useState(true);

  const url =
    "https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setVPassword] = useState("");

  //PROFILE
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [CivilStatus, setCivilStatus] = useState("");
  const [Gender, setGender] = useState("");
  const [Religion, setReligion] = useState("");
  const [Address, setAddress] = useState("");
  const [ZipCode, setZipCode] = useState("");

  const [EmploymentID, setEmploymentID] = useState("");
  const [PrcID, setPrcID] = useState("");
  const [Department, setDepartment] = useState("");
  const [CollegeTitle, setCollegeTitle] = useState("");

  const [SchoolName, setSchoolName] = useState("");
  const [Course, setCourse] = useState("");
  const [PeriodAttendedStart, setPeriodAttendedStart] = useState("");
  const [PeriodAttendedEnd, setPeriodAttendedEnd] = useState("");

  const [isErrorFN, setIsErrorFN] = useState(false);
  const [isErrorLN, setIsErrorLN] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorVP, setIsErrorVP] = useState(false);

  const login = async () => {
    try {
      let bodyFormData = new FormData();

      bodyFormData.append("name", name);
      bodyFormData.append("password", password);

      const res = await LoginRequest(bodyFormData);

      if (res.data.status === 404) {
        return res.data.error;
      }

      if (res.data.status === 401) {
        return "warning";
      }

      if (res.data.status === 200) {
        const userProfileData = res.data.data;

        setUser(userProfileData);

        console.log(user);
        sessionStorage.setItem("token", userProfileData["token"]);

        return "success";
      }
      if (res.data.status === 500) {
        if (res.data.errors === "Email or password incorrect") {
          return "E-P error";
        }
      }
    } catch (err) {
      return err.message;
    }
  };

  const register = async () => {
    try {
      let bodyFormData = new FormData();

      bodyFormData.append("name", name);
      bodyFormData.append("email", email);
      bodyFormData.append("password", password);
      bodyFormData.append("profile", url);
      bodyFormData.append("FirstName", FirstName);
      bodyFormData.append("LastName", LastName);

      let userProfileData = await RegisterRequest(bodyFormData);

      if (userProfileData.data.status === 404) {
        throw Error(userProfileData.data.error);
      }

      if (userProfileData.data.status === 409) {
        return "already exist";
      }

      if (userProfileData.data.status === 200) {
        return "success";
      }
    } catch (err) {
      return err.message;
    }
  };

  const requestSanctumCSRF = async () => {
    await api.get("sanctum/csrf-cookie");
  };

  useEffect(() => {
    requestSanctumCSRF();
    if (fetch) {
      setFetch(false);
    }
  }, [fetch]);

  const resetState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setVPassword("");
    setFirstName("");
    setLastName("");
  };

  const [firstCall, setFirstCall] = useState(true);

  const checkValidation = async () => {
    try {
      if (sessionStorage.getItem("token") !== null) {
        const res = await UserAllGetRequest();
        setUser(res.data.data);
        return;
      }
      setUser({
        loggedIn: false,
      });
    } catch (e) {
      if (user === null) {
        setUser({
          loggedIn: false,
        });
      }
    }
  };

  useEffect(() => {
    if (user === null && firstCall === true) {
      setFirstCall(false);
      setTimeout(() => checkValidation(), [200]);
    }
  }, [firstCall]);

  return (
    <DataContext.Provider
      value={{
        authException,
        setAuthException,
        email,
        setEmail,
        password,
        setPassword,
        vpassword,
        setVPassword,
        user,
        setUser,
        profile,
        setProfile,
        // Profile Data
        FirstName,
        setFirstName,
        LastName,
        setLastName,
        MiddleName,
        setMiddleName,
        BirthDate,
        setBirthDate,
        CivilStatus,
        setCivilStatus,
        Gender,
        setGender,
        Religion,
        setReligion,
        Address,
        setAddress,
        ZipCode,
        setZipCode,
        EmploymentID,
        setEmploymentID,
        PrcID,
        setPrcID,
        Department,
        setDepartment,
        CollegeTitle,
        setCollegeTitle,
        SchoolName,
        setSchoolName,
        Course,
        setCourse,
        PeriodAttendedStart,
        setPeriodAttendedStart,
        PeriodAttendedEnd,
        setPeriodAttendedEnd,
        // End of Profile Data
        name,
        setName,
        isErrorFN,
        setIsErrorFN,
        isErrorLN,
        setIsErrorLN,
        isErrorEmail,
        setIsErrorEmail,
        isErrorPassword,
        setIsErrorPassword,
        isErrorVP,
        setIsErrorVP,
        login,
        register,
        resetState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
