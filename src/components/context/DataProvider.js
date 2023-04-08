import { createContext, useState, useEffect } from "react";

import { GetRequest, PostRequest } from '../api/api';
import { Auth, User, Case } from '../api/Path';
import { Sanctum } from '../api/Path';

import StatusHandler from '../Utils/StatusHandler';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [authException, setAuthException] = useState("Error");
  
  const [search, setSearch] = useState('');

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
    let msg = '';
    let bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('password', password);

    PostRequest({ url: `${Auth}/signin` }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        const json = res.data.data;
        sessionStorage.setItem('token', json['token']);
        setUser(json);
      })
      .catch(err => {
        msg = StatusHandler(err);
      });

    return msg;
  };

 
  const register = async () => {
    let msg = '';
    let bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    bodyFormData.append('profile', url);
    bodyFormData.append('FirstName', FirstName);
    bodyFormData.append('LastName', LastName);

    PostRequest({ url: `${Auth}/signup` }, bodyFormData)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        msg = 'success';
      })
      .catch(err => {
        msg = StatusHandler(err);
      });
    return msg;
  };


  const requestSanctumCSRF = async () => {
    GetRequest({ url: Sanctum })
      .then(res => {
        if (!res.status === 200) {
          throw new Error('Bad response.');
        }

        // console.log('success.');
      })
      .catch(err => {
        // console.log(err);
      });
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
        search,
        setSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
