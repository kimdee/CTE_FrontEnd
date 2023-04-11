import { Link } from "react-router-dom";

import {
  Box,
  Stack,
  Divider,
  Spacer,
  Heading,
  Center,
  Image,
  IconButton,
} from "@chakra-ui/react";

import { HiOutlineUserCircle, HiOutlineMenu } from "react-icons/hi";

import CTE_logo from "../../media/cte_logo.png";

import DefNavBtn from "./DefNavBtn";

export default function CompressedNav({ nav, details }) {
  return (
    <Stack
      w="60px"
      h="100vh"
      p={2}
      position="sticky"
      top="0"
      bg="blueCTE.500"
      color="gray.50"
    >
      <IconButton
        icon={<HiOutlineMenu />}
        variant="ghost"
        mr={2}
        onClick={nav}
      />
      <Box my={5}>
        <Center>
          <Image boxSize="45px" src={CTE_logo} />
        </Center>
        <Center py={2}>
          <Heading size="xs" textAlign="center" fontWeight="black">
            CTE
          </Heading>
        </Center>
      </Box>

      {details.map((detail) => (
        <Link to={detail.link}>
          <DefNavBtn name={detail.name} icon={detail.icon} />
        </Link>
      ))}

      <Spacer />
      <Divider />

      <Link to="profile">
        <DefNavBtn name="Profile" icon={HiOutlineUserCircle} />
      </Link>
    </Stack>
  );
}
