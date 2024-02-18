import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Section = ({ children, title }) => {
  return (
    <>
      <Box>
        <Heading fontWeight={300} fontSize="20px">
          {title}
        </Heading>
        {children}
      </Box>
    </>
  );
};

export default Section;
