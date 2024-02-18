import { Outlet } from "react-router-dom";

import React from "react";
import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
