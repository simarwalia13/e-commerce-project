import React, { useState } from "react";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useAtom } from "jotai";
import { atomPrice, priceChangeStopAtom } from "./store";

const Sidebar = () => {
  const data = [
    {
      tab: "All Products",
    },
    {
      tab: "Bestsellers",
    },
    {
      tab: "Furniture",
    },
    {
      tab: "Lighting",
    },
    {
      tab: "New",
    },
    {
      tab: "Rugs",
    },
    {
      tab: "Sale",
    },
  ];
  const [price, setPrice] = useAtom(atomPrice);

  const [, setPriceChangeStop] = useAtom(priceChangeStopAtom);

  const [isExpanded, setIsExpanded] = useState(false);

  const togglePriceRange = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };
  const handleChange = (e) => {
    setPrice(parseFloat(e?.target?.value));
    setPriceChangeStop(false);
  };
  const handleMouseUp = () => {
    setPriceChangeStop(true);
  };

  return (
    <div>
      <div className="   border-gray-700  ">
        <div className=" ml-8 text-gray-800">
          {/* upper section */}
          <div className="flex items-center gap-x-[5px] w-full border border-blue-800 mb-[200px]  ">
            <div className="text-md">Home</div>
            <LiaGreaterThanSolid size={17} />
            <div className="text-md  border"></div>
          </div>

          {/* mid section */}
          {/* <div className=""> */}
          <div className="text-2xl gap-x-2 flex  text-gray-500 border-b-[1px] pr-[90px] pb-[20px]  border-[#D9D9D9] mb-[15px]">
            <span className="">Browse</span>
            <span className="">by</span>
          </div>
          <div className=""></div>
          <div className="flex flex-col gap-y-[7px]">
            {data?.map((product) => (
              <button className=" w-fit hover:opacity-70 hover:border-b-[1px] hover:border-black focus:border-b-[1px] focus:border-black">
                {product?.tab}
              </button>
            ))}
          </div>
          {/* </div> */}

          {/* lower section */}
          <div className="">
            <div className="text-2xl gap-x-2 flex  text-gray-500 border-b-[1px] pr-[90px] pb-[20px] mt-[100px] border-[#D9D9D9] mb-[12px]">
              <span className="">Filter</span>
              <span className="">by</span>
            </div>
          </div>
          <div className=" border-b-[1px] border-[#D9D9D9]">
            <div className="flex items-center pb-[12px] justify-between ">
              <div className="">Price</div>
              <div className="cursor-pointer" onClick={togglePriceRange}>
                {isExpanded ? <FiMinus size={20} /> : <GoPlus size={20} />}
              </div>
            </div>

            {isExpanded && (
              <div className="">
                <div className="flex items-center py-4">
                  <span className="mr-2 text-sm">59.50</span>
                  <input
                    type="range"
                    min="59.50"
                    max="85.00"
                    step="0.01"
                    value={price}
                    onChange={handleChange}
                    onMouseUp={handleMouseUp}
                    className=" w-[100px]  bg-[#D9D9D9]  "
                  />
                  <span className="ml-2 text-sm">${price.toFixed(2)}</span>
                </div>
              </div>
            )}
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
