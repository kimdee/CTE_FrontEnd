import React, { useState } from "react";
import CustomSidebar from "./Component/Sidebar.js";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Flex, Box } from "@chakra-ui/react";
import "../Sidebar.css";

const Home = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Flex w={"100%"} pos={"absolute"}>
      <ProSidebarProvider>
        <CustomSidebar flip={collapse} />
        <Flex w={"100%"} h={"100vh"} display={"flex"} flexDirection={"column"}>
          {/* <Homeheader flip={collapse} setflip={setCollapse} /> */}
          <Box id="maincontent" style={{ marginLeft: collapse ? "75px" : "" }}>
            {children}
          </Box>
        </Flex>
      </ProSidebarProvider>
    </Flex>
  );
};

export default Home;

// import { Outlet } from "react-router-dom";
// import { useState } from "react";

// import { Box, Flex, useMediaQuery } from "@chakra-ui/react";

// import {
//   HiOutlineAnnotation,
//   HiOutlineChartBar,
//   HiOutlineUserGroup,
//   HiOutlineClipboardList,
//   HiDocument,
//   HiUserGroup,
// } from "react-icons/hi";

// import DefaultNav from "./Component/DefaultNav";
// import CompressedNav from "./Component/CompressedNav";
// import MobileNav from "./Component/MobileNav";

// var mobileWidthMin = "(min-width: 30em)";
// var screenWidthMin = "(min-width: 48em)";

// const btnDetails = [
//   {
//     name: "Announcement",
//     link: "announcement",
//     icon: HiOutlineAnnotation,
//   },
//   {
//     name: "Analytics",
//     link: "analytics",
//     icon: HiOutlineChartBar,
//   },
//   {
//     name: "Faculties",
//     link: "faculties",
//     icon: HiOutlineUserGroup,
//   },
//   {
//     name: "Schedule",
//     link: "schedule",
//     icon: HiOutlineClipboardList,
//   },
//   {
//     name: "Requests",
//     link: "requests",
//     icon: HiDocument,
//   },
//   {
//     name: "Users",
//     link: "users",
//     icon: HiUserGroup,
//   },
// ];

// function Dashboard() {
//   const [compressedView] = useMediaQuery(screenWidthMin);
//   const [mobileView] = useMediaQuery(mobileWidthMin);
//   const [nav, setNav] = useState(true);

//   function navClicked() {
//     setNav(!nav);
//   }

//   return (
//     <Flex
//       bgColor="gray.200"
//       flexDirection={["column", "row-reverse"]}
//       color="gray.700"
//       justifyContent="flex-end"
//     >
//       <Box p={5} px={10} w={["100%", "100vw-60px", "100vw-250px"]}>
//         <Outlet />
//       </Box>

//       {mobileView ? (
//         nav && compressedView ? (
//           <DefaultNav nav={navClicked} details={btnDetails} />
//         ) : (
//           <CompressedNav nav={navClicked} details={btnDetails} />
//         )
//       ) : (
//         <MobileNav details={btnDetails} />
//       )}
//     </Flex>
//   );
// }

// export default Dashboard;
