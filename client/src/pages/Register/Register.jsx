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
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
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
    <section className={styles.registerPage}>
      {errMsg && (
        <Text color="red.300" my={4} fontSize="xl">
          {errMsg}
        </Text>
      )}

      {/* <IconButton
        aria-label="Toggle theme"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      /> */}

      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <Heading>Sign Up</Heading>
        <FormControl isInvalid={userEmail && !validUserEmail}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            id="email"
            autoComplete="off"
            type="text"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            onFocus={() => setUserEmailFocus(true)}
            onBlur={() => setUserEmailFocus(false)}
            borderColor={validUserEmail ? "green.500" : null}
            required
          />
          {userEmailFocus && userEmail && !validUserEmail && (
            <p>
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          )}
        </FormControl>
        <FormControl
          isInvalid={
            password &&
            !Object.values(validPassword).every((prop) => prop === true)
          }
        >
          <FormLabel htmlFor="password">Password:</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              borderColor={
                Object.values(validPassword).every((prop) => prop === true)
                  ? "green.500"
                  : null
              }
              required
            />

            <InputRightElement width="4.5rem">
              <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {passwordFocus && password && (
            <ul>
              <li>Uppercase letter: {validPassword.uppercase ? "✅" : "❌"}</li>
              <li>Lowercase letter: {validPassword.lowercase ? "✅" : "❌"}</li>
              <li>Digit: {validPassword.digit ? "✅" : "❌"}</li>
              <li>
                Special character: {validPassword.specialChar ? "✅" : "❌"}
              </li>
              <li>
                Minimum length (6 characters):
                {validPassword.minLength ? "✅" : "❌"}
              </li>
            </ul>
          )}
        </FormControl>
        <FormControl isInvalid={matchPassword && !validMatchPassword}>
          <FormLabel htmlFor="confirm_password">Match Password:</FormLabel>
          <InputGroup size="md">
            <Input
              id="confirm_password"
              type={showMatchPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              borderColor={
                matchPassword && validMatchPassword ? "green.500" : null
              }
              required
            />
            <InputRightElement width="4.5rem">
              <Button onClick={() => setShowMatchPassword(!showMatchPassword)}>
                {showMatchPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!validMatchPassword && (
            <FormErrorMessage>Passwords must be the same!</FormErrorMessage>
          )}
          <Button type="submit">Create an account</Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </FormControl>
      </form>
    </section>
  );
};

export default Register;
