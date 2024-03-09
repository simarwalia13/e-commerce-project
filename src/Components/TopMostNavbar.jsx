import React from "react";
import { topMostNavbarData } from "./Data";

const TopMostNavbar = () => {
  return (
    <div>
      <div className="  ">
        <div className="flex justify-around  border border-red-600">
          {topMostNavbarData?.map((elm) => (
            <button className="border-r-[1px] border-white bg-teal-900   min-[425px]:w-[100%] max-[1024px]:w-full  text-white py-[6px] ">
              <div className="">{elm?.discount}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMostNavbar;
