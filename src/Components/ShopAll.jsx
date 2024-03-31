import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { atomPrice, priceChangeStopAtom } from "./store";
import { RxCross2 } from "react-icons/rx";

const ShopAll = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [getData, setGetData] = useState([]);
  const [priceChangeStop] = useAtom(priceChangeStopAtom);

  const [price, setPrice] = useAtom(atomPrice);
  const [prevPrice, setPrevPrice] = useState(price);

  const [prevProductLength, setPrevProductLength] = useState(0);
  const [getImageData, setGetImageData] = useState();
  useEffect(() => {
    axios
      .get("/Data.json")
      .then((response) => {
        setGetData(response?.data);

        setPrevProductLength(() => {
          const filteredData = response?.data.filter(
            (product) => product.productPrice <= prevPrice
          );
          return filteredData.length;
        });
        setGetImageData(() => {
          const filteredData = response?.data.filter(
            (product) => product.productPrice <= prevPrice
          );
          return filteredData;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [prevPrice]);

  useEffect(() => {
    if (priceChangeStop === true) {
      setPrevPrice(price);
    }
  }, [price, priceChangeStop]);

  const shopAll = getData?.filter((product) => {
    return product.productPrice <= price;
  });

  const resetPrice = () => {
    setPrice(85.0);
  };

  const productLength = () => {
    if (priceChangeStop === true) {
      return shopAll.length;
    } else {
      return prevProductLength;
    }
  };

  return (
    <div className="    ">
      <div className="  mb-[85px] ">
        {/* heading section */}
        <div className="flex flex-col  items-center justify-center ">
          <div className="text-6xl mb-3 mt-8">All Products</div>
          <p className="w-fit text-center">
            This is your category description. It’s a great place to tell
            customers what this category is
            <br /> about, connect with your audience and draw attention to your
            products.
          </p>
        </div>
      </div>
      {/* filter Section ui */}
      {price < 85.0 && (
        <div className="flex items-center gap-x-2 mb-4">
          <div className="flex gap-x-2 items-center w-fit px-3 ml-3 bg-gray-300">
            <div className="">$59.50 -${prevPrice}</div>
            <RxCross2
              onClick={resetPrice}
              size={15}
              className="cursor-pointer"
            />
          </div>
          <div onClick={resetPrice} className="cursor-pointer">
            Clear all
          </div>
        </div>
      )}

      {price <= 85.0 && (
        <div className="text-md mb-3 ml-4 opacity-90">
          {productLength()} products
        </div>
      )}

      <div className="grid grid-cols-3 gap-y-[50px]  ">
        {getImageData?.map((product, index) => (
          <div key={product?.productId} className=" relative ">
            <div className="relative w-[85%] ">
              <img
                src={
                  hoveredIndex === index ? product.imageTwo : product.imageOne
                }
                alt={`slide${product?.productId}_combined`}
                className="max-w-full h-auto cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {product.isProductNew === "yes" && (
                <div className="absolute bottom-[96%] px-2 py-[2px] text-sm bg-[#3F5C58] text-white">
                  New
                </div>
              )}
              {product.productOnSale === "true" && (
                <div className="absolute bottom-[96%] px-2 py-[2px] text-sm bg-[#3F5C58] text-white">
                  Sale
                </div>
              )}
              {product.isProductBestseller === "1" && (
                <div className="absolute bottom-[96%] px-2 py-[2px] text-sm bg-[#3F5C58] text-white">
                  Bestseller
                </div>
              )}

              {hoveredIndex === index && (
                <button
                  className={`absolute bottom-0 left-0 right-0 bg-white  ${
                    hoveredIndex === index
                      ? "transition ease-in-out 	duration-800 bg-opacity-80"
                      : ""
                  }   pointer-events-none p-2 text-center `}
                  onClick={() => {
                    console.log(`Quick  : ${product?.productId}`);
                  }}
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
      {/* card section */}
    </div>
  );
};

export default ShopAll;
