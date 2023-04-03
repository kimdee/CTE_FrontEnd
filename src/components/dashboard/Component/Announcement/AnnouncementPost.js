import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Spacer,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
} from "@chakra-ui/react";

import { HiOutlineDotsVertical } from "react-icons/hi";
// import demopic from '../../../../media/demopic.png'

export default function AnnouncementPost({ post }) {
  function deleteAnnouncement() {
    fetch(
      `http://api.ctewmsufaculty.xyz/api/announcement/destroy/${post.announcement_id}`,
      {
        method: "DELETE",
      }
    );
  }

  return (
    <Box
      bgColor="gray.50"
      my={5}
      p={5}
      borderRadius={25}
      boxShadow="md"
      w={["80vw", "75vw", "700px"]}
    >
      <Flex alignItems="center" mb={5}>
        <Avatar name="Lastname, First Middle" size="sm" mr={2} />
        <Box>
          <Heading size="xs">Teacher Education(Admin)</Heading>
          <Text fontSize="xs" color="gray.500">
            {post.created_at}
          </Text>
        </Box>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HiOutlineDotsVertical />}
            borderRadius={100}
            variant="ghost"
          />
          <MenuList>
            <MenuItem>Update</MenuItem>
            <MenuItem onClick={() => deleteAnnouncement()}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Heading size="xs" mb={2}>
        {post.announcement_type}
      </Heading>
      <Text>{post.announcement_details}</Text>
      <Image
        src={post.announcement_image}
        fallbackSrc="fallbackimg.jpg"
        my={2}
      />
      {/* 
      <Image src={'/images/' + data.announcementImage} my={2} /> */}
    </Box>
  );
}
