import { Box, Heading, Divider, Stack, Container } from "@chakra-ui/react";

import InformationCard from "../Component/Profile/InfoCard";
import ProfileCard from "../Component/Profile/ProfileCard";

export default function Profile() {
  return (
    <Container maxW={"container.xxl"}>
      <Box w="100%">
        <Heading size="lg" mb={5}>
          Profile
        </Heading>
        <Stack direction={["column", "column", "column", "row"]}>
          <InformationCard />

          <Stack w={["80vw", "54vw"]}>
            <ProfileCard />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
