import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import { Image, Flex, Box, Heading, Text } from '@chakra-ui/react';
import RouteData from '../Routes/RouteData';
import { useNavigate } from 'react-router-dom';
import '../Style/Sidebar.css';
import useAuth from '../Hooks/AuthContext';
import { useState } from 'react';

const SidebarDividerHeader = ({ data, header, collapsed }) => {
  return (
    <>
      {collapsed ? null : (
        <span
          key={data.index}
          style={{
            fontSize: '12px',
            marginLeft: '10%',
            color: '#101D8B',
          }}
          id="consult"
        >
          {header}
        </span>
      )}
    </>
  );
};

const SidebarHeader = props => {
  return (
    <Box w={'100%'} pl={3} pr={3} pt={3}>
      <Flex
        justifyContent={props.collapsed ? 'center' : 'space-between'}
        alignItems={'center'}
      >
        <Flex justifyContent={'center'} columnGap={2} alignItems={'center'}>
          <Box w={props.collapsed ? 12 : 8} transitionDuration={'0.5s'}>
            <Image src={require('../Media/cte_logo.png')} />
          </Box>

          <Heading
            display={props.collapsed ? 'none' : 'block'}
            transitionDuration={'0.5s'}
            fontSize={'1.4rem'}
            color="blue.600"
          >
            CTE
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

const MenuItemComponent = props => {
  return (
    <MenuItem
      icon={
        <Box
          p={2}
          boxShadow="lg"
          bg="white"
          rounded={5}
          className="menu-item-icon"
        >
          {props.child}
        </Box>
      }
      className="menu-item"
      onClick={e => props.click(e, props.path)}
    >
      <Text width="full" className="menu-item-text">
        {props.title}
      </Text>
    </MenuItem>
  );
};

const SidebarComponent = props => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [theme, setTheme] = useState('light');

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const themes = {
    light: {
      sidebar: {
        backgroundColor: '#fff',
        color: '#607489',
      },
      menu: {
        menuContent: '#fbfcfd',
        icon: '#3e5e7e',
        hover: {
          backgroundColor: '#bed9e0',
          color: 'teal',
          boxShadow: '10px 10px 8px #888888',
        },
        active: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: '#0b2948',
        color: '#8ba1b7',
      },
      menu: {
        menuContent: '#082440',
        icon: '#59d0ff',
        hover: {
          backgroundColor: '#0e3052',
          color: '#b6c8d9',
        },
        active: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    },
  };

  const menuItemStyles = {
    root: {
      fontSize: '14px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: {
      backgroundColor: themes[theme].menu.menuContent,
    },
    button: {
      [`&.${menuClasses.active}`]: {
        backgroundColor: themes[theme].menu.active.backgroundColor,
        color: themes[theme].menu.active.color,
      },
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: themes[theme].menu.hover.backgroundColor,
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <Box>
      <Sidebar h={'100vh'} backgroundColor="white" breakPoint="lg">
        <SidebarHeader collapsed={props.collapsed} />
        <Box h={20}></Box>
        <Menu menuItemStyles={menuItemStyles}>
          {RouteData.path
            .filter(x =>
              user.user_role === 'Super Admin'
                ? x.superadmin === true
                : user.user_role === 'Admin'
                ? x.admin === true
                : user.user_role === 'User'
                ? x.user === true
                : null
            )
            .map(data => {
              return (
                <>
                  {data.index === 1 || data.index === 5 || data.index === 9 ? (
                    <SidebarDividerHeader
                      data={data}
                      header={
                        data.index === 1
                          ? 'ANALYTICS'
                          : data.index === 5
                          ? 'CONSULTATION'
                          : 'SETTINGS'
                      }
                      key={data.index * 2}
                      collapsed={props.collapsed}
                    />
                  ) : null}
                  <MenuItemComponent
                    key={data.index}
                    title={data.label}
                    path={data.href}
                    child={data.icon}
                    click={e => handleClick(e, data.href)}
                  />
                </>
              );
            })}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;

// import { Menu, MenuItem } from "react-pro-sidebar";
// import { useNavigate } from "react-router-dom";

// import { Image, Heading, Box, Divider, Text } from "@chakra-ui/react";

// import RouteData from "../Routes/RouteData";
// import useAuth from "../Hooks/AuthContext";
// import "../Style/Sidebar.css"

// const SidebarDividerHeader = ({ data, header, flip }) => {
//   return (
//     <>
//       {flip ? null : (
//         <span
//           key={data.index}
//           style={{
//             fontSize: "12px",
//             marginLeft: "10%",
//             color: "#101D8B",
//           }}
//           id="consult"
//         >
//           {header}
//         </span>
//       )}
//     </>
//   );
// };

// const CustomSidebar = ({ flip }) => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const handleClick = (data) => {
//     navigate("/h" + data.href);
//   };

//   return (
//     <>
//       <div
//         className="sidebar"
//         style={{ width: flip && "75px", display: flip && "block" }}
//       >
//         <Menu iconShape="circle" color={"#182BD0"}>
//           <MenuItem
//             icon={<Image w={8} src={require("../Media/cte_logo.png")} />}
//           >
//             <Heading size={"md"}>CTE </Heading>
//           </MenuItem>
//           <Box h={10} p={4}>
//             <Divider color={"red"} width={"1px"} />
//           </Box>
//           {RouteData.path
//             .filter((x) =>
//               user.user_role === "Super Admin"
//                 ? x.superadmin === true
//                 : user.user_role === "Admin"
//                 ? x.admin === true
//                 : user.user_role === "User"
//                 ? x.staff === true
//                 : null
//             )
//             .map((data) => {
//               return (
//                 <>
//                   {data.index === 1 || data.index === 5 || data.index === 9 ? (
//                     <SidebarDividerHeader
//                       data={data}
//                       header={
//                         data.index === 1
//                           ? "ANALYTICS"
//                           : data.index === 5
//                           ? "CONSULTATION"
//                           : "SETTINGS"
//                       }
//                       flip={flip}
//                       key={data.index * 2}
//                     />
//                   ) : null}
//                   <MenuItem
//                     key={data.index}
//                     onClick={() => handleClick(data)}
//                     icon={data.icon}
//                   >
//                     <Text> {data.label}</Text>
//                   </MenuItem>
//                 </>
//               );
//             })}
//         </Menu>
//       </div>
//     </>
//   );
// };

// export default CustomSidebar;
