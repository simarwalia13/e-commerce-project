import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { atomCartId } from "./store";
import axios from "axios";

const Cart = () => {
  const [cartId] = useAtom(atomCartId);
  console.log("cartId", cartId);

  useEffect(() => {
    axios
      .get(`/Data.json?=${cartId}`)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cartId]);
  return (
    <div>
      <div className=""></div>
    </div>
  );
};

export default Cart;
