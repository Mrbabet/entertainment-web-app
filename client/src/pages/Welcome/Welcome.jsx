import React from "react";
import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <Outlet />
      <Link to="login">Sign In</Link>
      <Link to="register">Sign Up</Link>
    </>
  );
};

export default Welcome;
