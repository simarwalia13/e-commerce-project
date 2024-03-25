import React from "react";
import TopMostNavbar from "./TopMostNavbar";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";

const LayoutCart = ({ children }) => {
  return (
    <div>
      <TopMostNavbar />
      <Navbar />
      <TopNavbar />
      <div className="w-full h-[100vh]">{children}</div>
    </div>
  );
};

export default LayoutCart;
