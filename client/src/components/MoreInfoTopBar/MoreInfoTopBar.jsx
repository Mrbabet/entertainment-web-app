import { Flex } from "@chakra-ui/react";
import React from "react";
import { Link as ChakraLink } from "react-router-dom";

const MoreInfoTopBar = () => {
  return (
    <>
      <Flex
        listStyleType={"none"}
        gap={"24px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <ChakraLink>Overview</ChakraLink>
        <ChakraLink>Media</ChakraLink>
        <ChakraLink>Fanbase</ChakraLink>
        <ChakraLink>Share</ChakraLink>
      </Flex>
    </>
  );
};

export default MoreInfoTopBar;
