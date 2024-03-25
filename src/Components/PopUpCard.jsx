import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  atomAdd,
  atomSendCart,
  atomShow,
  cardDetails,
  cardRender,
  showProduct,
} from "./store";
import axios from "axios";
import { FiCircle } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ShowCart from "./ShowCart";

const PopUpCard = () => {
  const [cardId] = useAtom(cardDetails);
  // console.log("ca", cardId);
  const [, setPopUp] = useAtom(cardRender);

  const [popData, setPopData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [add, setAdd] = useAtom(atomAdd);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setProductView] = useAtom(showProduct);
  const [cartData, setCartData] = useAtom(atomSendCart);
  console.log("cartData", cartData);
  const [cartt, setCartt] = useAtom(atomShow);
  const [localAdd, setLocalAdd] = useState(1);
  // console.log("cartData", cartData);
  // console.log("productView", productView);

  // console.log("popData", popData);
  // console.log("cardId", cardId);

  useEffect(() => {
    axios
      .get(`/Data.json`)
      .then((res) => {
        const specificData = res?.data?.find(
          (item) => item?.productId === cardId
        );
        // console.log("specificData", specificData);
        setPopData(specificData);
        // console.log("res", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cardId]);

  const handleCircleClick = (image) => {
    setSelectedImage(image);
  };
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCartData(cardId);
      setPopUp(false);
      setCartt(true);
      setAdd(add);
      setLocalAdd(1);
    }, 2000);
  };

  const plus = (e) => {
    e.stopPropagation();
    if (add < 5 && localAdd < 5) {
      setAdd(add + 1);
      setLocalAdd(add + 1);
    }
  };

  const minus = (e) => {
    e.stopPropagation();
    if (add > 1 && localAdd > 1) {
      setAdd(add - 1);
      setLocalAdd(add - 1);
    }
  };
  const resetAddValue = () => {
    setLocalAdd(1);
  };
  // const resetAdd = () => {
  //   if (handleClick) {
  //     setLocalAdd(1);
  //   }
  // };

  return (
    <div
      // onClick={() => setPopUp(false)}
      className="fixed  top-0 left-0 w-full h-full bg-[#808080] bg-opacity-70 z-30 "
    >
      <div className="flex justify-center items-center h-full">
        <div className="absolute  bg-[#FFFFFF]    w-[47%] h-[60vh]">
          <div
            className="flex cursor-pointer justify-end mr-3 mt-2"
            onClick={() => {
              setPopUp(false);
              resetAddValue();
            }}
          >
            <RxCross2 size={22} />
          </div>
          {/* image part  */}
          <div className="">
            <div className=" flex ">
              {popData && (
                <div className="  w-[53%]">
                  <img
                    src={selectedImage || popData.imageOne}
                    alt=""
                    className="w-[74%]  ml-[70px] select-none"
                  />
                </div>
              )}

              <div className="ml-9">
                <div className="text-4xl text-[#5C5757] mb-3 font-sans select-none">
                  {popData?.productCategory}
                </div>
                <div className="text-lg select-none">
                  ${popData?.productPrice}
                </div>
                <div className="">
                  <div className="mt-[30px] mb-2 select-none">Quantity</div>
                  <div className="flex gap-x-4 ">
                    <div
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setShow(true);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        setShow(false);
                      }}
                      className={`border w-fit px-3  py-1  flex justify-between  mb-10`}
                      style={{ minWidth: "90px", height: "40px" }}
                    >
                      <div className=" w-fit select-none">{localAdd}</div>

                      <div className="flex flex-col  w-fit">
                        {show === true && (
                          <IoIosArrowUp
                            className="cursor-pointer"
                            onClick={(e) => plus(e)}
                            size={16}
                          />
                        )}
                        {show === true && (
                          <IoIosArrowDown
                            className="cursor-pointer "
                            onClick={(e) => minus(e)}
                            size={16}
                          />
                        )}
                      </div>
                    </div>
                    {localAdd >= 5 && (
                      <span className=" text-red-600 text-sm mt-2 select-none">
                        Order limit reached
                      </span>
                    )}
                  </div>
                </div>

                {/* cart button */}

                <div
                  onClick={handleClick}
                  className="bg-black text-white w-[250px] text-center hover:bg-opacity-70 py-2 cursor-pointer select-none "
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Add to Cart"}
                </div>
                <div
                  onClick={() => {
                    setProductView((change) => !change);
                  }}
                  className="text-[15px] mt-4 underline cursor-pointer select-none"
                >
                  View more Detail
                </div>
              </div>
            </div>
            <div className="ml-[200px] mt-3 ">
              <button
                onClick={() => handleCircleClick(popData?.imageOne)}
                className=" "
              >
                <FiCircle
                  size={15}
                  fill={selectedImage === popData?.imageOne ? "black" : "gray"}
                  color="white"
                />
              </button>
              <button
                onClick={() => handleCircleClick(popData?.imageTwo)}
                className="ml-[4px]"
              >
                <FiCircle
                  size={15}
                  fill={selectedImage === popData?.imageTwo ? "black" : "gray"}
                  color="white"
                />
              </button>
              <button
                onClick={() => handleCircleClick(popData?.imageThree)}
                className=" ml-[4px]"
              >
                <FiCircle
                  size={15}
                  fill={
                    selectedImage === popData?.imageThree ? "black" : "gray"
                  }
                  color="white"
                />
              </button>
            </div>

            {/* details of product part */}
          </div>
        </div>
      </div>

      {cartt === true && <ShowCart />}
    </div>
  );
};

export default PopUpCard;
