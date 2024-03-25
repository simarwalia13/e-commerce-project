import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { atomAdd, atomSendCart, atomShow } from "./store";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const ShowCart = () => {
  const [cartt, setCartt] = useAtom(atomShow);
  const [cartData] = useAtom(atomSendCart);
  console.log("cartDat", cartData);
  // const [todoData, setTodoData] = useState([]);
  // const [, setData] = useState([]);
  // console.log("data", data);
  // const [todoList, setTodoList] = useState([]);
  // console.log("todoList", todoList);
  const [add, setAdd] = useAtom(atomAdd);
  const [cartItems, setCartItems] = useState([]);
  console.log("cartItems", cartItems);
  // console.log("add", add);
  console.log("cat", cartt);
  // console.log("todoData", todoData);

  useEffect(() => {
    if (cartData) {
      axios
        .get(`/Data.json?productId=${cartData}`)
        .then((res) => {
          const newItem = res.data.find((item) => item.productId === cartData);
          const itemExists = cartItems.some(
            (item) => item.productId === newItem.productId
          );
          if (!itemExists) {
            setCartItems((prevItems) => [...prevItems, newItem]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cartData, cartItems]);

  const notDisplay = (e) => {
    e.stopPropagation();
    setCartt(true);
  };
  const plus = () => {
    if (add < 5) {
      setAdd(add + 1);
    }
  };

  const minus = () => {
    if (add > 1) {
      setAdd(add - 1);
    }
  };
  const removeItem = (productId, e) => {
    e.stopPropagation();
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
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
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className=" border-b border-gray-300  w-fit flex gap-x-4 ml-5 mr-5"
              >
                <div className=" w-[28%]  select-none ">
                  <img src={item.imageOne} alt="" className=" p-2 w-full" />
                </div>

                <div className="">
                  <div className="text-md text-[#5C5757] pt-3 select-none">
                    {item.productCategory}
                  </div>
                  <div className="text-md font-bold text-[#5C5757] select-none">
                    ${item.productPrice}
                  </div>
                  <div className="">
                    <div className="border w-fit px-1  py-[1px]  flex justify-between gap-x-3 items-center mt-[7px]">
                      <FiMinus
                        className="cursor-pointer text-black"
                        onClick={minus}
                        size={13}
                      />

                      <div className=" w-fit text-black text-center select-none">
                        {add}
                      </div>

                      <GoPlus
                        className="cursor-pointer text-black"
                        onClick={plus}
                        size={14}
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="text-black mt-3 ml-[80px] cursor-pointer">
                    <RxCross2
                      size={15}
                      onClick={(e) => removeItem(item.productId, e)}
                    />
                  </div>
                  <div className="mt-[44px]">
                    {add >= 5 && (
                      <div className=" text-red-600 text-[13px]   select-none">
                        Order limit reached
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
