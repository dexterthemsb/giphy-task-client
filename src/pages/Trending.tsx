import { Box, SimpleGrid } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { FC, useEffect, useRef } from "react";
import ControlsConsole from "../components/ControlsConsole";
import GIFHolder from "../components/GIFHolder";
import Page from "../components/Layout/Page";
import useGIF from "../hooks/useGIF";
import { useQuery } from "../hooks/useQuery";

const Trending: FC = () => {
  const { query, search, trending, loadMore } = useGIF();
  const params = useQuery();

  const loader = useRef(null);
  const callback = useRef(loadMore);
  const observer = useRef(
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback.current();
      }
    }, {})
  );

  useEffect(() => {
    const getTrendingGIFs = async () => {
      if (!trending) {
        callback.current();
      }
    };

    getTrendingGIFs();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const currentLoader = loader.current!;
    const currentObserver = observer.current;

    if (loader) {
      currentObserver.observe(currentLoader);
    }

    return () => {
      if (currentObserver) {
        currentObserver.unobserve(currentLoader);
      }
    };
  }, [loader]);

  useEffect(() => {
    callback.current = loadMore;
  }, [loadMore]);

  return (
    <Page>
      <ControlsConsole />

      <>
        <SimpleGrid mt="4" pb="4" columns={[1, 2, 3]} gap={4}>
          {params.get("tab") !== "saved" && (
            <>
              {!query &&
                trending.map((data: any, index) => (
                  <GIFHolder
                    key={index}
                    id={data.id}
                    fixed_size_url={data.images.fixed_height_small.url}
                    url={data.images.original.url}
                  />
                ))}

              {!!query &&
                search.map((data: any, index) => (
                  <GIFHolder
                    key={index}
                    id={data.id}
                    fixed_size_url={data.images.fixed_height_small.url}
                    url={data.images.original.url}
                  />
                ))}
            </>
          )}
        </SimpleGrid>

        <Box display="flex" flexDir="row" alignItems="center" justifyContent="center">
          <CircularProgress mt="4" mb="32" size="24px" isIndeterminate />
        </Box>
      </>

      <Box ref={loader} w="full" h="2" bgColor="white"></Box>
    </Page>
  );
};

export default Trending;
