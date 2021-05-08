import { Box } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { FC } from "react";

const FullPageLoading: FC = () => {
  return (
    <Box w="full" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress isIndeterminate />
    </Box>
  );
};

export default FullPageLoading;
