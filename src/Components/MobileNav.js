import { Link } from "react-router-dom";

import { Stack } from "@chakra-ui/react";

import { HiOutlineUserCircle } from "react-icons/hi";

import DefNavBtn from "./DefNavBtn";

export default function MobileNav({ details }) {
  return (
    <Stack
      direction="row"
      p={2}
      position="sticky"
      bottom="0"
      boxShadow="dark-lg"
      justifyContent="space-around"
      bg="blueCTE.500"
      color="gray.50"
    >
      {details.map((detail) => (
        <Link to={detail.link}>
          <DefNavBtn name={detail.name} icon={detail.icon} />
        </Link>
      ))}

      <Link to="profile">
        <DefNavBtn name="Profile" icon={HiOutlineUserCircle} />
      </Link>
    </Stack>
  );
}
