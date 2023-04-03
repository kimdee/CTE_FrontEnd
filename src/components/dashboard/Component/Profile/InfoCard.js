import {
  Box,
  Center,
  Heading,
  Image,
  Table,
  Tr,
  Th,
  Td,
  Tag,
  Button,
} from "@chakra-ui/react";

import CTE_logo from "../../../media/samplepic.jpg";

export default function InformationCard() {
  return (
    <Box
      bgColor="gray.50"
      h="100%"
      pb={2}
      borderRadius={25}
      w={["80vw", "300px"]}
    >
      <Center flexDirection="column" p={5}>
        <Image
          boxSize="175px"
          src={CTE_logo}
          objectFit="cover"
          borderRadius="full"
          mb={5}
        />
        <Heading size="sm">FirstName LastName</Heading>
      </Center>
      <Table size="sm" variant="unstyled">
        <Tr>
          <Th>College Title</Th>
          <Td>College Dean</Td>
        </Tr>
        <Tr>
          <Th>Department</Th>
          <Td>Elementary Education Department</Td>
        </Tr>
        <Tr>
          <Th>Employment Date</Th>
          <Td>April 22, 2021</Td>
        </Tr>
        {/* <Tr>
          <Th>Status</Th>
          <Td>
            <Tag colorScheme='green'>Available</Tag>
          </Td>
        </Tr> */}
      </Table>
      <Center>
        <Button m={2} colorScheme="blueCTE" w="90%">
          Logout
        </Button>
      </Center>
    </Box>
  );
}
