import { useAtom } from "jotai";
import React from "react";
import { atomSendCart, atomShow } from "./store";
import { IoIosArrowForward } from "react-icons/io";

import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const ShowCart = () => {
  const [cartt, setCartt] = useAtom(atomShow);
  const [cartData, setCartData] = useAtom(atomSendCart);
  console.log("cartDat", cartData);

  // const [add, setAdd] = useAtom(atomAdd);
  // const [cartItems, setCartItems] = useState([]);
  // console.log("cartItems", cartItems);
  // console.log("add", add);
  console.log("cat", cartt);
  // console.log("todoData", todoData);

  const notDisplay = (e) => {
    e.stopPropagation();
    setCartt(true);
  };
  const plus = (productId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.newItem.productId === productId) {
        return {
          ...item,
          newItem: { ...item.newItem, quantity: item.newItem.quantity + 1 },
        };
      }
      return item;
    });

    setCartData(updatedCartData);
  };

  const minus = (productId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.newItem.productId === productId && item.newItem.quantity > 1) {
        return {
          ...item,
          newItem: { ...item.newItem, quantity: item.newItem.quantity - 1 },
        };
      }
      return item;
    });

    setCartData(updatedCartData);
  };

  const removeItem = (product, e) => {
    console.log("productId", product);
    e.stopPropagation();

    setCartData(
      cartData.filter((item) => {
        return item.newItem.productId !== product;
      })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setCartt(false);
        }}
        className="fixed  top-0 left-0 w-full h-full bg-[#808080] bg-opacity-50 z-30"
      >
        <div
          onClick={notDisplay}
          className={`top-0 right-0 w-[18vw] bg-white  text-white absolute h-full z-40   ease-in-out duration-400 ${
            cartt ? "translate-x-0 " : "translate-x-full "
          }`}
        >
          <div className="bg-[#414141] h-[10vh] w-full flex items-center pl-4 gap-x-[90px]">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setCartt(false);
              }}
              className=" cursor-pointer"
            >
              <IoIosArrowForward size={28} className="" />
            </div>
            <div className="text-xl select-none ">Cart</div>
          </div>

          {/* carddetails */}
          <div className="">
            {cartData?.map((item) => (
              <li
                key={item.newItem.productId}
                className=" border-b border-gray-300  w-fit flex gap-x-4 ml-5 mr-5"
              >
                <img
                  src={item.newItem.imageOne}
                  alt=""
                  className=" w-[28%] p-2  select-none "
                />

                <div className="">
                  <div className="text-md text-[#5C5757] pt-3 select-none">
                    {item.newItem.productCategory}
                  </div>
                  <div className="text-md font-bold text-[#5C5757] select-none">
                    ${item.newItem.productPrice}
                  </div>
                  <div className="">
                    <div className="border w-fit px-1  py-[1px]  flex justify-between gap-x-3 items-center mt-[7px]">
                      <FiMinus
                        className="cursor-pointer text-black"
                        onClick={() => minus(item?.newItem?.productId)}
                        size={13}
                      />

                      <div className=" w-fit text-black text-center select-none">
                        {item.newItem.quantity}
                      </div>

                      <GoPlus
                        className="cursor-pointer text-black"
                        onClick={() => plus(item?.newItem?.productId)}
                        size={14}
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="text-black mt-3 ml-[80px] cursor-pointer">
                    <RxCross2
                      size={15}
                      onClick={(e) => removeItem(item.newItem.productId, e)}
                    />
                  </div>
                  {/* <div className="mt-[44px]">
                    {item.newItem.quantity >= 5 && (
                      <div className=" text-red-600 text-[13px]   select-none">
                        Order limit reached
                      </div>
                    )}
                  </div> */}
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
