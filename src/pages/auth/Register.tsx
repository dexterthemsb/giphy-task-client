import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
import { AxiosResponse } from "axios";
import { FC, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert";
import Page from "../../components/Layout/Page";
import { ROUTE_LOGIN } from "../../constants/routes";
import axiosInstance from "../../utils/axios";

const Register: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();

    setErr("");

    const config = { email: username, password };

    try {
      const res: AxiosResponse = await axiosInstance.post("register", config);

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.data.msg) setErr(err.response.data.msg);
      else setErr("Something went wrong");
    }
  };

  return (
    <Page>
      <Box w="full" minH="inherit" display="flex" alignItems="center" justifyContent="center">
        <form onSubmit={e => handleRegister(e)}>
          <Box
            pt="16"
            pb="16"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading mb="2" w="xs" fontWeight="black">
              Sign Up
            </Heading>
            <Text mb="4" w="xs">
              Please enter your email and password to register & search for GIFs.
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
              Register
            </Button>

            <Text mt="8">
              {`Already have an account? `}
              <ChakraLink as={Link} to={ROUTE_LOGIN} color="blue.500">
                Sign In
              </ChakraLink>
            </Text>
          </Box>
        </form>
      </Box>

      <CustomAlert msg={err} severity="error" action={() => setErr("")} />
    </Page>
  );
};

export default Register;
