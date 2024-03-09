import React from "react";
import TopMostNavbar from "./TopMostNavbar";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
// import ShopAll from "./ShopAll";

const LayoutSection = ({ children }) => {
  console.log("children", children);
  return (
    <div className="">
      <TopMostNavbar />
      <Navbar />
      <TopNavbar />
      <div className="flex border gap-x-10  border-blue-300">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default LayoutSection;
