import { Helmet } from "react-helmet";
import { Container } from "@chakra-ui/layout";
import { FC, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import FullPageLoading from "./FullPageLoading";

interface PageProps {
  title: string;
}

const Page: FC<PageProps> = ({ title, children }) => {
  const { mounting } = useAuth();

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {mounting ? (
        <FullPageLoading />
      ) : (
        <Container maxW="container.lg" minH="100vh">
          {children}
        </Container>
      )}
    </>
  );
};

export default Page;
