import React from "react";
import BasketCart from "../components/BasketCart";

import styles from "./CheackoutPage.module.css";
import { TbChecklist } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { checkout as checkoutDespatch } from "../features/cart/cartSlice";

function CheackoutPage() {
  const { selectedItems, total, itemsCounter, checkout } = useSelector((store) => store.cart);
  const despatch = useDispatch();

  // const [{selectedItems, total, itemsCounter, checkout}, despatch] = useCart();

  if (!selectedItems.length) return <p>Empty</p>;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <p>
          <TbChecklist /> Total: <span>{total}</span>
        </p>
        <p>
          <FaHashtag /> Quntity: <span>{itemsCounter}</span>
        </p>
        <p><BsPatchCheck /> Status: <span>{!checkout && "pending..."}</span></p>
        <button onClick={() => despatch(checkoutDespatch())}>Cheackout</button>
      </div>
      <div className={styles.products}>
        {selectedItems.map((product) => (
          <BasketCart key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default CheackoutPage;
