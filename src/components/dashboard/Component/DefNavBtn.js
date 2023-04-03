import { Flex, Heading, Icon, useMediaQuery } from "@chakra-ui/react";

var screenWidthMin = "(min-width: 48em)";

export default function DefNavBtn({ name, icon, compressed }) {
  const [landscapeView] = useMediaQuery(screenWidthMin);
  const view = compressed;
  return (
    <Flex
      p={2}
      bgColor="blueCTE.500"
      borderRadius={5}
      alignItems="center"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _active={{
        bg: "blueCTE.50",
        transform: "scale(0.98)",
      }}
    >
      <Icon w={6} h={6} alignContent="center" as={icon} />
      {landscapeView && view ? (
        <Heading size="xs" mx={2}>
          {name}
        </Heading>
      ) : (
        ""
      )}
    </Flex>
  );
}
