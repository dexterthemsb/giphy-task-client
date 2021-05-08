import { Container } from "@chakra-ui/layout";
import { FC, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import FullPageLoading from "./FullPageLoading";

const Page: FC = ({ children }) => {
  const { mounting } = useAuth();

  useEffect(() => window.scrollTo(0, 0), []);

  return mounting ? (
    <FullPageLoading />
  ) : (
    <Container maxW="container.lg" minH="100vh">
      {children}
    </Container>
  );
};

export default Page;
