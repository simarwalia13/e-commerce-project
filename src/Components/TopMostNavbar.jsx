import React from "react";
import { topMostNavbarData } from "./Data";
import { useNavigate } from "react-router-dom";

const TopMostNavbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className="  ">
        <div className="flex justify-around  border border-red-600">
          {topMostNavbarData?.map((elm) => (
            <button
              key={elm?.url}
              onClick={() => handleNavigate(elm?.url)}
              className="border-r-[1px] border-white bg-teal-900   min-[425px]:w-[100%] max-[1024px]:w-full  text-white py-[6px] "
            >
              {elm?.discount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMostNavbar;
