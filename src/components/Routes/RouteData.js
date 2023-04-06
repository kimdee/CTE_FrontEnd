import {
  FaUsers,
  FaUserFriends,
  FaHospitalUser,
  FaRegHospital,
} from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import { BsArchive } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { TbFileReport } from "react-icons/tb";
import { RiFileListFill } from "react-icons/ri";

import Announcement from "../dashboard/Pages/Announcement";
import User from "../dashboard/Pages/User";

const RouteData = {
  path: [
    {
      index: 1,
      icon: <MdAnnouncement />,
      href: "/announcement",
      label: "Announcement",
      element: <Announcement />,
      superadmin: true,
      admin: true,
      staff: true,
    },
    {
      index: 2,
      icon: <FaUsers />,
      href: "/users",
      label: "Users",
      element: <User />,
      superadmin: true,
      admin: false,
      staff: false,
    },

    // {
    //   index: 3,
    //   icon: <FaUserMd />,
    //   href: "/doctors",
    //   label: "Doctors",
    //   element: <Doctor />,
    //   superadmin: true,
    //   admin: true,
    //   doctor: false,
    //   edoctor: false,
    //   staff: false,
    // },
    // {
    //   index: 4,
    //   icon: <FaUserFriends />,
    //   href: "/patients",
    //   label: "Patients",
    //   element: <Patient />,
    //   superadmin: false,
    //   admin: false,
    //   doctor: false,
    //   edoctor: true,
    //   staff: false,
    // },
    // {
    //   index: 5,
    //   icon: <FaHospitalUser />,
    //   href: "/case",
    //   label: "Active Case",
    //   element: <Case />,
    //   superadmin: false,
    //   admin: true,
    //   doctor: true,
    //   edoctor: true,
    //   staff: true,
    // },
    // {
    //   index: 6,
    //   icon: <BsArchive />,
    //   href: "/archived",
    //   label: "Archived",
    //   element: <Archived />,
    //   superadmin: false,
    //   admin: true,
    //   doctor: true,
    //   edoctor: true,
    //   staff: true,
    // },
    // {
    //   index: 7,
    //   icon: <FaRegHospital />,
    //   href: "/hospital",
    //   label: "Hospital",
    //   element: <Hospital />,
    //   superadmin: true,
    //   admin: true,
    //   doctor: false,
    //   edoctor: false,
    //   staff: false,
    // },
    // {
    //   index: 8,
    //   icon: <GiSkills />,
    //   href: "/specialization",
    //   label: "Specialization",
    //   element: <Specialization />,
    //   superadmin: true,
    //   admin: true,
    //   doctor: false,
    //   edoctor: false,
    //   staff: false,
    // },
    // {
    //   index: 9,
    //   icon: <TbFileReport />,
    //   href: "/report",
    //   label: "Report",
    //   element: <Report />,
    //   superadmin: true,
    //   admin: false,
    //   doctor: false,
    //   edoctor: false,
    //   staff: false,
    // },
    // {
    //   index: 9,
    //   icon: <FaUserMd />,
    //   href: "/profile",
    //   label: "Profile",
    //   element: <Profile />,
    //   superadmin: true,
    //   admin: true,
    //   doctor: false,
    //   edoctor: false,
    //   staff: false,
    // },
  ],
};

export default RouteData;
