import { Box } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <Box>
        <Box></Box>
        <Box></Box>
      </Box>
      <Link to="/login">Sign In</Link>
      <Link to="/register">Sign Up</Link>
      <Outlet />
    </>
  );
};

export default Welcome;
