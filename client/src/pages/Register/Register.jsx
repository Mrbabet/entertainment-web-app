import React, { useEffect, useState } from "react";

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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showMatchPassword, setShowMatchPassword] = useState(false);

  const [user, setUser] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

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
  const [success, setSuccess] = useState(false);

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

  const PASS_UPPERCASE_LETTER_REGEX = /(?=.*?[A-Z])/;
  const PASS_LOWERCASE_LETTER_REGEX = /(?=.*?[a-z])/;
  const PASS_DIGIT_REGEX = /(?=.*?[0-9])/;
  const PASS_SPEC_CHAR_REGEX = /(?=.*?[#?!@$%^&*-])/;
  const PASS_MIN_LENGTH = /.{6,}/;

  useEffect(() => {
    setValidUsername(USER_REGEX.test(user));
  }, [user]);

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
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser("");
    setPassword("");
    setMatchPassword("");
  };

 
  

  return (
    <section onSubmit={handleSubmit}>
      {errMsg && (
        <Text color="red.300" my={4} fontSize="xl">
          {errMsg}
        </Text>
      )}
      <Heading>Register</Heading>
      <form>
        <FormControl isInvalid={user && !validUsername}>
          <FormLabel htmlFor="username">Username:</FormLabel>
          <Input
            id="username"
            autoComplete="off"
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            borderColor={validUsername ? "green.500" : null}
            required
          />
          {userFocus && user && !validUsername && (
            <p>
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          )}
        </FormControl>
        <FormControl isInvalid={password &&  !(Object.values(validPassword).every(prop => prop === true)) }>
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
              borderColor={(Object.values(validPassword).every(prop => prop === true)) ? "green.500": null}
              required
            />

            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
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
          <FormLabel htmlFor="match_password">Match Password:</FormLabel>
          <InputGroup size="md">
            <Input
              id="match_password"
              type={showMatchPassword ? "text" : "password"}
              placeholder="Enter match password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              borderColor={validMatchPassword ? "green.500" : null}
              required
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowMatchPassword(!showMatchPassword)}
              >
                {showMatchPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!validMatchPassword && (
           <FormErrorMessage>Passwords must be the same!</FormErrorMessage>
          )}
          <Button type="submit">Sign Up</Button>
        </FormControl>
      </form>
    </section>
  );
};

export default Register;
