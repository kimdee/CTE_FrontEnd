import {
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaChartBar,
  FaUserMd,
  FaUserEdit,
  FaRegEdit,
} from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { TbFileReport } from "react-icons/tb";
import { RiFileListFill } from "react-icons/ri";

import Announcement from "../Pages/Announcement";
import Analytics from "../Pages/Analytics";
import Staff from "../Pages/Staff";
import User from "../Pages/User";
import Profile from "../Pages/Profile";
import Schedules from "../Pages/Schedule";
import Requests from "../Pages/Request";

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
      user: true,
    },
    {
      index: 2,
      icon: <FaChartBar />,
      href: "/analytics",
      label: "Analytics",
      element: <Analytics />,
      superadmin: true,
      admin: true,
      user: true,
    },
    {
      index: 3,
      icon: <FaCalendarAlt />,
      href: "/schedule",
      label: "Schedule",
      element: <Schedules />,
      superadmin: true,
      admin: true,
      user: true,
    },
    {
      index: 4,
      icon: <FaRegEdit />,
      href: "/request",
      label: "Request",
      element: <Requests />,
      superadmin: true,
      admin: true,
      user: true,
    },
    {
      index: 5,
      icon: <FaUserTie />,
      href: "/staff",
      label: "Staff",
      element: <Staff />,
      superadmin: true,
      admin: true,
      user: true,
    },
    {
      index: 6,
      icon: <FaUsers />,
      href: "/users",
      label: "Users",
      element: <User />,
      superadmin: true,
      admin: true,
      user: false,
    },
    {
      index: 7,
      icon: <FaUserEdit />,
      href: "/profile",
      label: "Profile",
      element: <Profile />,
      superadmin: true,
      admin: true,
      user: true,
    }
  ],
};

export default RouteData;
