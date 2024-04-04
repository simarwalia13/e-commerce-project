import { useAtom } from "jotai";
import React, { useState } from "react";
import { atomData } from "./store";

const BestSeller = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [getData] = useAtom(atomData);

  const bestSellers = getData?.filter((product) => {
    return product.isProductBestseller === "1";
  });

  return (
    <div className="mt-[130px] ">
      <div className="w-full flex justify-center items-center h-20 mb-6 ">
        <div className="text-3xl text-black tracking-[.10em]">Bestsellers</div>
      </div>
      <div className="flex justify-center ml-2  ">
        {bestSellers.map((product, index) => (
          <div key={product.productId} className=" relative ">
            <div className="relative w-[80%] ">
              <img
                src={
                  hoveredIndex === index ? product.imageTwo : product.imageOne
                }
                alt={`slide${product.productId}_combined`}
                className="max-w-full h-auto cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {hoveredIndex === index && (
                <button
                  className="absolute bottom-0 left-0 bg-opacity-80 right-0 bg-gray-800 pointer-events-none text-white p-2 text-center "
                  // onClick={() => {
                  // }}
                >
                  Quick View
                </button>
              )}
            </div>
            {/* product description */}
            <div className="mt-2 text-lg flex flex-col items-center">
              <div className="">{product.productCategory}</div>
              <div className="  ">{product.productPrice}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
