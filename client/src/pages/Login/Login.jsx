import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();
  const { setAuth } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);



  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        { user, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUser("");
      setPassword("");
      toast({
        title: "Signing in",
        status: "success",
        duration: 2000,
        position: "top",
      });
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      setAuth({ user, password, accessToken });
    } catch (error) {
      console.log(error);
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
    <section className={styles.public}>
      <Heading>Sign In</Heading>
      {errMsg && (
        <Text color="red.300" my={4} fontSize="xl">
          {errMsg}
        </Text>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="username">Username:</FormLabel>
          <Input
            id="username"
            autoComplete="off"
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            onBlur={onBlur}
            required
          />
          <FormLabel htmlFor="password">Password:</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onBlur={onBlur}
              required
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit">Sign In</Button>
        </FormControl>
      </form>

      <p>
        Need an Account? <br />
        <Link to="/">Sign Up</Link>
      </p>

      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
