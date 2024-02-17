import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from "./Login.module.css";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Text,
  useToast,
  Image,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { SunIcon, MoonIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [userEmail, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: userEmail, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ email: userEmail, password, accessToken });
      setUserEmail("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      }
      if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const content = (
    <>
      <section className={styles.loginPage}>
        <div className={styles.loginFormContainer}>
          <Icon width="33" height="27" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
              fill="#FC4747"
            />
          </Icon>

          <form noValidate className={styles.loginForm} onSubmit={handleSubmit}>
            {errMsg && (
              <Text color="red.300" my={4} fontSize="xl">
                {errMsg}
              </Text>
            )}
            <Heading as="h2" fontSize="xl" fontWeight={300} mb="40px">
              Sign In
            </Heading>
            <FormControl mb="24px">
              <FormLabel m={0} fontSize="xs" htmlFor="email">
                Email:
              </FormLabel>
              <Input
                id="email"
                autoComplete="off"
                placeholder="Email address"
                _placeholder={{ fontSize: "sm" }}
                style={{ caretColor: "#FC4747" }}
                type="email"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                variant="flushed"
                focusBorderColor="#fff"
                required
              />
            </FormControl>
            <FormControl mb="24px">
              <FormLabel m={0} fontSize="xs" htmlFor="password">
                Password:
              </FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="Password"
                  _placeholder={{ fontSize: "sm" }}
                  style={{ caretColor: "#FC4747" }}
                  type={show ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  variant="flushed"
                  focusBorderColor="#fff"
                  required
                />
                <InputRightElement>
                  <Button bg="transparent" onClick={() => setShow(!show)}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Flex
              gap="24px"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Button type="submit">Sign In</Button>
              <Text>
                Need an Account?{" "}
                <ChakraLink as={Link} color="#FC4747" to="/register">
                  Sign Up
                </ChakraLink>
              </Text>
            </Flex>
          </form>
        </div>
      </section>
    </>
  );

  return content;
};

export default Login;
