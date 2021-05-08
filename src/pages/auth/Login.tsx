import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
import { AxiosResponse } from "axios";
import { FC, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert";
import Page from "../../components/Layout/Page";
import { ROUTE_REG } from "../../constants/routes";
import axiosInstance from "../../utils/axios";

const Login: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    setErr("");

    const config = { email: username, password };

    try {
      const res: AxiosResponse = await axiosInstance.post("login", config);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.data.msg) setErr(err.response.data.msg);
      else setErr("Something went wrong");
    }
  };

  return (
    <Page title="Giphy - Login">
      <Box w="full" minH="inherit" display="flex" alignItems="center" justifyContent="center">
        <form onSubmit={e => handleLogin(e)}>
          <Box
            pt="16"
            pb="16"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading mb="2" w="xs" fontWeight="black">
              Sign In
            </Heading>
            <Text mb="4" w="xs">
              Please enter your email and password to login & search for GIFs.
            </Text>

            <Input
              mt="4"
              w="xs"
              required
              type="email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Email"
            />
            <Input
              mt="4"
              w="xs"
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />

            <Button type="submit" mt="8" colorScheme="blue" w="xs">
              Sign In
            </Button>

            <Text mt="8">
              {`New here? `}
              <ChakraLink as={Link} to={ROUTE_REG} color="blue.500">
                Sign Up
              </ChakraLink>
            </Text>
          </Box>
        </form>
      </Box>

      <CustomAlert msg={err} severity="error" action={() => setErr("")} />
    </Page>
  );
};

export default Login;
