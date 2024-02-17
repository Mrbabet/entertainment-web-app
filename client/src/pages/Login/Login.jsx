import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";

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
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            required
          />
          <FormLabel htmlFor="password">Password:</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
    </>
  );

  return content;
};

export default Login;
