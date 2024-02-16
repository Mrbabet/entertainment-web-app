import { Outlet } from "react-router-dom";

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
