import { useEffect, useState } from "react";
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
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, useColorMode } from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  ViewIcon,
  ViewOffIcon,
  WarningIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import styles from "./Register.module.css";

import axios from "../../api/axios";
const REGISTER_URL = "/register";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showMatchPassword, setShowMatchPassword] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [validUserEmail, setValidUserEmail] = useState(false);
  const [userEmailFocus, setUserEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState({
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
    minLength: false,
  });
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const USER_EMAIL_REGEX =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/;
  const FULL_PASS_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
  const PASS_UPPERCASE_LETTER_REGEX = /(?=.*?[A-Z])/;
  const PASS_LOWERCASE_LETTER_REGEX = /(?=.*?[a-z])/;
  const PASS_DIGIT_REGEX = /(?=.*?[0-9])/;
  const PASS_SPEC_CHAR_REGEX = /(?=.*?[#?!@$%^&*-])/;
  const PASS_MIN_LENGTH = /.{6,}/;

  useEffect(() => {
    setValidUserEmail(USER_EMAIL_REGEX.test(userEmail));
  }, [userEmail]);

  useEffect(() => {
    const uppercaseValid = PASS_UPPERCASE_LETTER_REGEX.test(password);
    const lowercaseValid = PASS_LOWERCASE_LETTER_REGEX.test(password);
    const digitValid = PASS_DIGIT_REGEX.test(password);
    const specialCharValid = PASS_SPEC_CHAR_REGEX.test(password);
    const minLengthValid = PASS_MIN_LENGTH.test(password);

    setValidPassword({
      uppercase: uppercaseValid,
      lowercase: lowercaseValid,
      digit: digitValid,
      specialChar: specialCharValid,
      minLength: minLengthValid,
    });

    const matchValid = password === matchPassword;

    setValidMatchPassword(matchValid);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [userEmail, password, matchPassword]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_EMAIL_REGEX.test(userEmail);
    const v2 = FULL_PASS_REGEX.test(password);
    console.log(v1, v2);
    if (!v1 || !v2) {
      setErrMsg("Invalid entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        { email: userEmail, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUserEmail("");
      setPassword("");
      setMatchPassword("");
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response?.accessToken));
      navigate("/welcome", { replace: true });
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration failed");
      }
    }
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <section className={styles.registerPage}>
        <IconButton
          aria-label="Toggle theme"
          position={"absolute"}
          top={0}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
        <div className={styles.registerFormContainer}>
          <Icon width="33" height="27" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
              fill="#FC4747"
            />
          </Icon>

          <form
            noValidate
            className={styles.registerForm}
            onSubmit={handleSubmit}
          >
            {errMsg && (
              <Text color="red.300" my={4} fontSize="xl">
                {errMsg}
              </Text>
            )}
            <Heading as="h2" fontSize="xl" fontWeight={300} mb="40px">
              Sign Up
            </Heading>
            <FormControl mb="24px" isInvalid={userEmail && !validUserEmail}>
              <FormLabel m={0} htmlFor="email" fontSize="xs">
                Email:
              </FormLabel>
              <Input
                id="email"
                autoComplete="off"
                placeholder="Email address"
                _placeholder={{ fontSize: "sm" }}
                style={{ caretColor: "#FC4747" }}
                type="text"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                onFocus={() => setUserEmailFocus(true)}
                onBlur={() => setUserEmailFocus(false)}
                borderColor={validUserEmail ? "green.500" : null}
                focusBorderColor="#fff"
                variant="flushed"
                required
              />
              {userEmailFocus && userEmail && !validUserEmail && (
                <p>Wrong email address</p>
              )}
            </FormControl>
            <FormControl
              mb="24px"
              isInvalid={
                password &&
                !Object.values(validPassword).every((prop) => prop === true)
              }
            >
              <FormLabel m={0} htmlFor="password" fontSize="xs">
                Password:
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  _placeholder={{ fontSize: "sm" }}
                  style={{ caretColor: "#FC4747" }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  borderColor={
                    Object.values(validPassword).every((prop) => prop === true)
                      ? "green.500"
                      : null
                  }
                  focusBorderColor="#fff"
                  variant="flushed"
                  required
                />

                <InputRightElement>
                  <Button
                    bg="transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordFocus && password && (
                <ul>
                  <li>
                    Uppercase letter:{" "}
                    {validPassword.uppercase ? (
                      <CheckCircleIcon color="green.500" />
                    ) : (
                      <WarningIcon color="red.500" />
                    )}
                  </li>
                  <li>
                    Lowercase letter:{" "}
                    {validPassword.lowercase ? (
                      <CheckCircleIcon color="green.500" />
                    ) : (
                      <WarningIcon color="red.500" />
                    )}
                  </li>
                  <li>
                    Digit:{" "}
                    {validPassword.digit ? (
                      <CheckCircleIcon color="green.500" />
                    ) : (
                      <WarningIcon color="red.500" />
                    )}
                  </li>
                  <li>
                    Special character:{" "}
                    {validPassword.specialChar ? (
                      <CheckCircleIcon color="green.500" />
                    ) : (
                      <WarningIcon color="red.500" />
                    )}
                  </li>
                  <li>
                    Minimum length (6 characters):{" "}
                    {validPassword.minLength ? (
                      <CheckCircleIcon color="green.500" />
                    ) : (
                      <WarningIcon color="red.500" />
                    )}
                  </li>
                </ul>
              )}
            </FormControl>
            <FormControl
              mb="24px"
              isInvalid={matchPassword && !validMatchPassword}
            >
              <FormLabel m={0} htmlFor="confirm_password" fontSize="xs">
                Confirm Password:
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="confirm_password"
                  type={showMatchPassword ? "text" : "password"}
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  placeholder="Confirm password"
                  _placeholder={{ fontSize: "sm" }}
                  style={{ caretColor: "#FC4747" }}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  focusBorderColor="#fff"
                  borderColor={
                    matchPassword && validMatchPassword ? "green.500" : null
                  }
                  variant="flushed"
                  required
                />
                <InputRightElement>
                  <Button
                    bg="transparent"
                    onClick={() => setShowMatchPassword(!showMatchPassword)}
                  >
                    {showMatchPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!validMatchPassword && (
                <FormErrorMessage>Passwords must be the same!</FormErrorMessage>
              )}
            </FormControl>
            <Flex
              gap="24px"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Button
                fontSize="sm"
                fontWeight={300}
                width="100%"
                height="48px"
                type="submit"
              >
                Create an account
              </Button>
              <Text>
                Already have an account?{" "}
                <ChakraLink as={Link} color="#FC4747" to="/login">
                  Sign In
                </ChakraLink>
              </Text>
            </Flex>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
