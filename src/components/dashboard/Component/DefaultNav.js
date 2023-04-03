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

import DefNavBtn from "./DefNavBtn";
import CTE_logo from "../../media/cte_logo.png";

export default function DefaultNav({ nav, details }) {
  return (
    <Stack
      w="250px"
      h="100vh"
      p={2}
      position="sticky"
      top="0"
      bg="blueCTE.500"
      color="gray.50"
    >
      <IconButton
        pos="absolute"
        icon={<HiOutlineMenu />}
        variant="ghost"
        onClick={nav}
      />
      <Box>
        <Center>
          <Image boxSize="75px" src={CTE_logo} />
        </Center>
        <Center py={2}>
          <Heading size="xs" textAlign="center" fontWeight="black">
            College of Teachers Educations
          </Heading>
        </Center>
      </Box>

      {details.map((detail) => (
        <Link to={detail.link}>
          <DefNavBtn name={detail.name} compressed="true" icon={detail.icon} />
        </Link>
      ))}

      <Spacer />
      <Divider />

      <Link to="profile">
        <DefNavBtn
          name="Profile"
          compressed="true"
          icon={HiOutlineUserCircle}
        />
      </Link>
    </Stack>
  );
}
