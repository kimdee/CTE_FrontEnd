import { useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

import CTE_logo from "../../Media/cte_logo.png";

import useAuth from "../../Hooks/AuthContext";
import CustomFormController from "../Customs/CustomFormController";

import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Image,
  SlideFade,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { onOpen } = useDisclosure();

  const [header, setHeader] = useState("");
  const [feedback, setFeedback] = useState("");

  const {
    authException,
    setAuthException,
    password,
    setPassword,
    name,
    setName,
    isErrorEmail,
    isErrorPassword,
    login,
    resetState,
  } = useAuth();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let res = await login();

    if (res === "success") {
      navigate("/h");
    }

    if (res === "E-P error") {
      setHeader("Invalid");
      setFeedback("Email or password incorrect");
      resetState();
      onOpen();
    }

    setAuthException(res);
    setLoading(false);
  };

  return (
    <Center bg={"blueGrad"} h={"100vh"} w={"100vw"} flexDirection={"column"}>
      <SlideFade initialScale={0.8} in>
        <form className="form-container" onSubmit={(e) => handleSubmitLogin(e)}>
          <Center
            bg={"white"}
            borderRadius={[0, 25]}
            px={[10, 5, 10]}
            py={5}
            w={["100vw", "480px"]}
            h={["100vh", "100%"]}
            flexDirection={"column"}
          >
            <Center>
              <Image boxSize={"100px"} src={CTE_logo} />
            </Center>

            <Center>
              <Text>{"Western Mindanao State University"}</Text>
            </Center>

            <Center pb={1}>
              <Heading size={"lg"} textAlign={"center"} fontWeight={"black"}>
                {"College of Teachers Education"}
              </Heading>
            </Center>

            <CustomFormController
              isSignup={false}
              title={"Username"}
              type={"Text"}
              value={name}
              placeholder={"Enter username"}
              setValue={setName}
              errorMessage={"Email is required"}
              isError={isErrorEmail}
              children={
                <Box
                  w={8}
                  h={4}
                  mt={6}
                  mb={6}
                  borderRight={"1px solid #e0e0e0"}
                >
                  <Center>
                    <FaUserAlt color="#2422a4" size={15} />
                  </Center>
                </Box>
              }
            />

            <CustomFormController
              isSignup={false}
              title={"Password"}
              type={"password"}
              value={password}
              placeholder={`Enter password`}
              setValue={setPassword}
              errorMessage={`Password is required.`}
              isError={isErrorPassword}
              children={
                <Box
                  w={8}
                  h={4}
                  mt={6}
                  mb={6}
                  borderRight={"1px solid #e0e0e0"}
                >
                  <Center>
                    <FaLock color="#2422a4" size={15} />
                  </Center>
                </Box>
              }
            />

            <Button
              marginTop={5}
              w={"100%"}
              colorScheme="blue"
              isLoading={loading}
              loadingText={"Submitting"}
              type="submit"
              value={"Submit"}
            >
              {"Login"}
            </Button>

            <Box py={5}>
              <Center>
                <Text>{"Having trouble logging in?"}</Text>
              </Center>

              <Center>
                <Button variant={"link"} colorScheme="blue">
                  {"Contact us"}
                </Button>
              </Center>
            </Box>

            <Divider />
            <Text fontSize={"sm"} color={"blue.200"} pt={5}>
              {"Made with ❤ by ICS"}
            </Text>
          </Center>
        </form>
      </SlideFade>
    </Center>
  );
};

export default Login;
