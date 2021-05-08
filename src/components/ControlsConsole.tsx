import { IconButton } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { AxiosResponse } from "axios";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import { Search, X } from "react-feather";
import { useQuery } from "../hooks/useQuery";
import axiosInstance from "../utils/axios";
import useGIF from "../hooks/useGIF";

const ControlsConsole: FC = () => {
  const { setQuery, setSearch } = useGIF();
  const params = useQuery();

  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const searchGIFs = async () => {
    try {
      setLoading(true);

      const res: AxiosResponse = await axiosInstance.get("search", { params: { q } });

      if (res.status === 200) {
        setSearch([...res.data.gifs.data]);
        setQuery(q);
      }

      setLoading(false);
    } catch (err) {
      console.log({ ...err });
      setLoading(false);
    }
  };

  const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchGIFs();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearch([]);
    setQ("");
  };

  useEffect(() => {
    return () => clearSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      zIndex="900"
      position="fixed"
      bottom="8"
      left="50%"
      transform="translate(-50%, 0)"
      p="4"
      w="max-content"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      borderWidth="revert"
      borderColor="gray.200"
      bgColor="gray.50"
      borderRadius="xl"
      boxShadow="xl"
    >
      <InputGroup w="xs">
        <InputLeftElement
          pointerEvents="none"
          children={
            loading ? (
              <CircularProgress color="gray.500" size="20px" isIndeterminate />
            ) : (
              <Box color="gray.400">
                <Search size={20} />
              </Box>
            )
          }
        />

        <Input
          disabled={loading || params.get("tab") === "saved"}
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => handleSearch(e)}
          placeholder="Search for GIFs here"
        />

        {!!q && (
          <InputRightElement
            cursor="pointer"
            children={
              <IconButton
                aria-label="Clear Search"
                variant="ghost"
                textColor="gray.600"
                size="xs"
                onClick={() => clearSearch()}
              >
                <X size={20} />
              </IconButton>
            }
          />
        )}
      </InputGroup>
    </Box>
  );
};

export default ControlsConsole;
