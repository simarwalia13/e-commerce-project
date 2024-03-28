import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  atomAdd,
  atomProductInfo,
  atomSendCart,
  atomShow,
  cardDetails,
} from "./store";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FiCircle } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const Cart = () => {
  const [productInfo] = useAtom(atomProductInfo);
  console.log("productInfo", productInfo);
  const [show, setShow] = useState(false);
  const [localAdd, setLocalAdd] = useState(1);
  const [add, setAdd] = useAtom(atomAdd);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rrExpanded, setRrExpanded] = useState(false);
  const [siExpanded, setSiExpanded] = useState(false);
  const [, setCartt] = useAtom(atomShow);
  const [cartData, setCartData] = useAtom(atomSendCart);
  console.log("cartData", cartData);
  const [cardId] = useAtom(cardDetails);

  const plus = (e) => {
    e.stopPropagation();

    setAdd(add + 1);
    setLocalAdd(add + 1);
  };

  const minus = (e) => {
    e.stopPropagation();
    if (add > 1 && localAdd > 1) {
      setAdd(add - 1);
      setLocalAdd(add - 1);
    }
  };

  const addItemToCart = () => {
    const existingItem = cartData.find(
      (item) => item.newItem.productId === cardId
    );

    if (existingItem) {
      const updatedCartData = cartData.map((item) => {
        if (item.newItem.productId === cardId) {
          return {
            ...item,
            newItem: {
              ...item.newItem,
              quantity: item.newItem.quantity + localAdd,
            },
          };
        }
        return item;
      });

      setCartData(updatedCartData);
    } else {
      const newItem = {
        productId: cardId,
        imageOne: productInfo?.imageOne,
        productCategory: productInfo?.productCategory,
        productPrice: productInfo?.productPrice,
        quantity: localAdd,
      };

      setCartData((prevItems) => [...prevItems, { newItem }]);
    }

    setCartt(true);
    setLocalAdd(1);
  };
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addItemToCart();
      setAdd(add);
    }, 2000);
  };
  const handleCircleClick = (image) => {
    setSelectedImage(image);
  };
  const toggleShow = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const toggle = () => setRrExpanded((change) => !change);

  const toggleShowMe = () => setSiExpanded((change) => !change);
  return (
    <div>
      {/* home prev next  */}
      <div className="  flex items-center justify-around cursor-pointer mt-[70px] mb-[30px]">
        <div className="flex gap-x-2">
          <div className="text-[17px] ">Home</div>
          <div className="text-[17px]">/</div>
          <div className="text-[17px] ">{productInfo.productCategory}</div>
        </div>

        <div className="flex items-center gap-x-[5px] cursor-pointer">
          <HiOutlineChevronLeft size={20} />
          <div className="text-[17px] ">Prev </div>
          <div className="text-[17px]">|</div>
          <div className="text-[17px]"> Next</div>
          <HiOutlineChevronRight size={20} />
        </div>
      </div>
      {/* img */}
      <div className=" ml-[21%] ">
        <div className="flex gap-x-[60px] ">
          {productInfo && (
            <img
              src={selectedImage || productInfo.imageOne}
              alt=""
              className="w-[31%] border border-black"
            />
          )}
          <div className=" flex flex-col gap-y-3 relative">
            <div className="text-2xl text-[#5C5757]">
              {productInfo.productCategory}
            </div>
            <div className="text-2xl text-[#5C5757]">
              ${productInfo.productPrice}
            </div>
            <div className="mt-[30px] mb-1 text-lg select-none">Quantity</div>

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
                className={`border w-fit px-3  py-1  flex justify-between  mb-10 min-w-[90px] min-h-[42px]`}
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
            </div>
            {/* cart button */}
            <div
              onClick={handleClick}
              className="bg-black text-white min-w-[320px] text-center hover:bg-opacity-70 py-2 cursor-pointer select-none   "
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Add to Cart"}
            </div>

            {/* buy now button */}
            <div className="border border-black text-black min-w-[320px] text-center  py-2 cursor-pointer select-none   ">
              Buy Now
            </div>
            {/* product info */}
            <div className=" border-b-[1px] border-[#D9D9D9] mt-6">
              <div className="flex items-center pb-[12px] justify-between ">
                <div className="">PRODUCT INFO</div>
                <div className="cursor-pointer" onClick={toggleShow}>
                  {isExpanded ? <FiMinus size={20} /> : <GoPlus size={20} />}
                </div>
              </div>

              {isExpanded && (
                <div className="w-[320px] text-[15px] text-justify overflow-auto ">
                  I'm a product detail. I'm a great place to add more
                  information about your product such as sizing, material, care
                  and cleaning instructions. This is also a great space to write
                  what makes this product special and how your customers can
                  benefit from this item.
                </div>
              )}
            </div>

            {/* return & refund policy */}
            <div className=" border-b-[1px] border-[#D9D9D9] mt-3">
              <div className="flex items-center pb-[12px] justify-between ">
                <div className="">RETURN & REFUND POLICY</div>
                <div className="cursor-pointer" onClick={toggle}>
                  {isExpanded ? <FiMinus size={20} /> : <GoPlus size={20} />}
                </div>
              </div>

              {rrExpanded && (
                <div className="w-[320px] text-[15px] text-justify">
                  I’m a Return and Refund policy. I’m a great place to let your
                  customers know what to do in case they are dissatisfied with
                  their purchase. Having a straightforward refund or exchange
                  policy is a great way to build trust and reassure your
                  customers that they can buy with confidence.
                </div>
              )}
            </div>

            {/* shipping info */}
            <div className=" border-b-[1px] border-[#D9D9D9] mt-3">
              <div className="flex items-center pb-[12px] justify-between ">
                <div className="">SHIPPING INFO</div>
                <div className="cursor-pointer" onClick={toggleShowMe}>
                  {isExpanded ? <FiMinus size={20} /> : <GoPlus size={20} />}
                </div>
              </div>

              {siExpanded && (
                <div className="w-[320px] text-[15px] text-justify">
                  I’m a Return and Refund policy. I’m a great place to let your
                  customers know what to do in case they are dissatisfied with
                  their purchase. Having a straightforward refund or exchange
                  policy is a great way to build trust and reassure your
                  customers that they can buy with confidence.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* circle select */}
      <div className="ml-[31%] mt-3 ">
        <button
          onClick={() => handleCircleClick(productInfo?.imageOne)}
          className=" "
        >
          <FiCircle
            size={15}
            fill={selectedImage === productInfo?.imageOne ? "black" : "gray"}
            color="white"
          />
        </button>
        <button
          onClick={() => handleCircleClick(productInfo?.imageTwo)}
          className="ml-[4px]"
        >
          <FiCircle
            size={15}
            fill={selectedImage === productInfo?.imageTwo ? "black" : "gray"}
            color="white"
          />
        </button>
        <button
          onClick={() => handleCircleClick(productInfo?.imageThree)}
          className=" ml-[4px]"
        >
          <FiCircle
            size={15}
            fill={selectedImage === productInfo?.imageThree ? "black" : "gray"}
            color="white"
          />
        </button>
      </div>

      {/* product description */}
      <div className="w-[470px]  text-[16px] text-justify ml-[21%] mt-3">
        I'm a product description. I'm a great place to add more details about
        your product such as sizing, material, care instructions and cleaning
        instructions.
      </div>

      {/* you might also like */}

      <div className="text-2xl ml-[50px] mt-8">You Might Also Like </div>
    </div>
  );
};

export default Cart;
