import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { Box } from "@chakra-ui/layout";
import { Fade } from "@chakra-ui/transition";
import { FC } from "react";

interface CustomAlertProps {
  msg: string;
  severity: "error" | "success" | "warning" | "info";
  action: Function;
}

const CustomAlert: FC<CustomAlertProps> = ({ msg, severity = "success", action }) => {
  return (
    <Fade in={!!msg}>
      <Alert
        w="xs"
        zIndex="1000"
        bottom="4"
        left="50%"
        transform="translate(-50%, 0)"
        ml="auto"
        mr="auto"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        borderRadius="lg"
        status={severity}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <AlertIcon />
          <AlertDescription mr="4">{msg}</AlertDescription>
        </Box>

        <CloseButton onClick={() => action()} />
      </Alert>
    </Fade>
  );
};

export default CustomAlert;
