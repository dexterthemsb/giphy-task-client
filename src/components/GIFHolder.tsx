import _ from "lodash";
import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { FC, useEffect, useState } from "react";
import { Heart } from "react-feather";
import useAuth from "../hooks/useAuth";
import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axios";
import { CircularProgress } from "@chakra-ui/progress";

interface GIFHolderProps {
  url: string;
  id: string;
  fixed_size_url: string;
  type?: string;
}

const GIFHolder: FC<GIFHolderProps> = ({ url, id, fixed_size_url, type = "" }) => {
  const { _id, saved, setSaved } = useAuth();

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<0 | 1>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkSaved = (): boolean => {
    return !!_.find(saved, obj => obj.id === id);
  };

  const saveUnsave = async () => {
    setIsLoading(true);

    try {
      const gif = { url, id, fixed_size_url };
      const config = { gif };

      const endpoint = `${isSaved ? "unsave-gif" : "save-gif"}/${_id}`;

      const res: AxiosResponse = await axiosInstance.post(endpoint, config);

      if (res.status === 201) {
        if (isSaved) setSaved([..._.filter(saved, obj => obj.id !== id)]);
        else setSaved([...saved, gif]);

        setIsSaved(isSaved => !isSaved);
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  // eslint-disable-next-line
  useEffect(() => setIsSaved(checkSaved()), []);

  useEffect(() => {
    setOpacity(0);
    setIsSaved(checkSaved());
    // eslint-disable-next-line
  }, [url]);

  return (
    <Box
      position="relative"
      w="100%"
      h="256px"
      borderRadius="xl"
      backgroundColor="gray.100"
      overflow="hidden"
    >
      <img
        style={{ opacity, width: "100%", height: "100%", objectFit: "cover" }}
        src={url}
        alt={id}
        loading="lazy"
        onLoad={() => {
          setOpacity(1);
          setIsLoading(false);
        }}
      />

      <IconButton
        disabled={isLoading}
        position="absolute"
        bottom="2"
        right="2"
        zIndex="800"
        size="sm"
        aria-label="Save this GIF"
        onClick={() => saveUnsave()}
      >
        {isLoading ? (
          <CircularProgress size="16px" isIndeterminate />
        ) : (
          <Heart fill={isSaved ? "black" : "none"} size={16} />
        )}
      </IconButton>
    </Box>
  );
};

export default GIFHolder;
