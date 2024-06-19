import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/organisms/footer/footer";
import Header from "src/components/organisms/header/header";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
