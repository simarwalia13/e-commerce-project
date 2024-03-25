import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { cardDetails, showProduct } from "./store";
import axios from "axios";

const ProductDetailPage = () => {
  const [cardId] = useAtom(cardDetails);
  console.log("ci", cardId);
  const [productViewd, setProductViewd] = useAtom(showProduct);
  console.log("pv", productViewd);
  const [idNo, setIdNo] = useState([]);
  console.log("idNo", idNo);

  useEffect(() => {
    axios
      .get("/Data.json")
      .then((res) => {
        const specificData = res.data.find((val) => val.productId === cardId);
        setIdNo(specificData);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className=""></div>
    </div>
  );
};

export default ProductDetailPage;
