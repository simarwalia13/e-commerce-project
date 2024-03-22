import { useAtom } from "jotai";
import React from "react";
import { showCartt } from "./store";

const cart = () => {
  const [cartt] = useAtom(showCartt);
  console.log("cart", cartt);

  return (
    <div>
      {cartt === true && (
        <div className="top-0 right-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-50">
          sss
        </div>
      )}
    </div>
  );
};

export default cart;
