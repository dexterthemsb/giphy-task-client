import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/layout";
import { FC } from "react";
import useAuth from "../hooks/useAuth";
import GIFHolder from "../components/GIFHolder";
import Page from "../components/Layout/Page";
import { Image } from "@chakra-ui/image";

const Saved: FC = () => {
  const { saved } = useAuth();

  return (
    <Page title="Giphy - Saved GIFs">
      {!!saved.length && (
        <SimpleGrid pt="4" pb="4" columns={[2, null, 3]} gap={4}>
          {saved.map((data: any, index) => (
            <GIFHolder
              key={index}
              id={data.id}
              fixed_size_url={data.fixed_size_url}
              url={data.url}
            />
          ))}
        </SimpleGrid>
      )}

      {!saved.length && (
        <Box
          w="full"
          h="100vh"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image mb="8" w="xs" src="/assets/images/404.png" />

          <Heading w="xs" mb="2" textAlign="center" fontWeight="black">
            Huh! Ok.
          </Heading>
          <Text w="xs" textAlign="center">
            You have no saved GIFs! You can search and save GIFs that you like.
          </Text>
        </Box>
      )}
    </Page>
  );
};

export default Saved;
