import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const Welcome = () => {
  return (
    <>
      <Flex>
        <Box p="24px" bg="#FC4747" w="60vw" h="100vh">
          {" "}
          <Icon width="33" height="27" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
              fill="#fff"
            />
          </Icon>
          <Image />
        </Box>
        <Box bg="#161D2F" w="40vw" h="100vh" p="24px">
          <Flex
            w="100%"
            h="100%"
            flexDirection={["column", "column", "row"]}
            justifyContent="center"
            alignItems="center"
            gap="24px"
          >
            <ChakraLink
              as={Link}
              to="/login"
              fontSize="sm"
              fontWeight={300}
              w="214px"
              h="48px"
              bg="#FC4747"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
              _hover={{ textDecoration: "none", bg: "#fff", color: "#161D2F" }}
            >
              Sign In
            </ChakraLink>

            <ChakraLink
              as={Link}
              to="/register"
              fontSize="sm"
              fontWeight={300}
              w="214px"
              h="48px"
              bg="#FC4747"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
              _hover={{ textDecoration: "none", bg: "#fff", color: "#161D2F" }}
            >
              Sign Up
            </ChakraLink>
          </Flex>
        </Box>
      </Flex>

      <Outlet />
    </>
  );
};

export default Welcome;
