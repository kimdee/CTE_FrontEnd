import { useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

import CTE_logo from "../Media/cte_logo.png";

import useAuth from "../Hooks/AuthContext";
import { CustomFormController } from "../Components/Custom";

import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Image,
  SlideFade,
  Text,
} from "@chakra-ui/react";

import { PostRequest } from '../API/api';
import { Auth } from "../API/Paths";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const { setUser } = useAuth();
  
  const handleReset = () => {
    setName('');
    setPassword('');
  };

  const handleSignin = async e => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    let form = new FormData();
    form.append('name', name.trim());
    form.append('password', password);

    PostRequest({ url: `${Auth}/signin` }, form)
      .then(res => {
        const {
          statusText,
          data: { data },
        } = res;
        if (!statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        sessionStorage.setItem('token', data.token);
        setUser(data);
        navigate('/');
        handleReset();
      })
      .catch(err => {
        const {
          response: {
            status,
            data: { message, data },
          },
        } = err;

        switch (status) {
          case 302:
            navigate('/account', { state: data });
            break;
          case 400:
            setFeedback(message);
            break;
          case 401:
            setFeedback(message);
            break;
          case 403:
            setFeedback(message);
            break;
          case 404:
            setFeedback(message);
            break;
          default:
            setFeedback('Please try again later.');
            break;
        }
      });
    setLoading(false);
  };

  return (
    <Center bg={"blueGrad"} h={"100vh"} w={"100vw"} flexDirection={"column"}>
      <SlideFade initialScale={0.8} in>
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
              type={"Text"}
              title={""}
              value={name}
              setValue={setName}
              placeholder={"Enter username"}
              isRequired={false}
              mt={5}
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
              type={"password"}
              title={""}
              value={password}
              setValue={setPassword}
              placeholder={`Enter password`}
              isRequired={false}
              mt={3}
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
             isLoading={loading}
             loadingText={'Signing In'}
             bg={'blue'}
             color={'white'}
             _hover={{ bg: 'teal' }}
             onClick={e => handleSignin(e)}
             disabled={name === '' || password === ''}
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
      </SlideFade>
    </Center>
  );
};

export default Login;
