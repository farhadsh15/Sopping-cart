import React from "react";
import { shortenText } from "../helpers/helper";

import styles from "./BasketCart.module.css";
import { MdDeleteOutline } from "react-icons/md";

function BasketCart({ data, clickHandler }) {
  const { title, image, price, quantity } = data;



  return (
    <div className={styles.container}>
      <img src={image} alt={title} />
      <span>{shortenText(title)}</span>
      <span>{price}</span>
      <div className={styles.action}>
        {quantity === 1 ? (
          <button onClick={() => clickHandler("REMOVE_ITEM", data)}>
            <MdDeleteOutline />
          </button>
        ) : (
          quantity > 1 && (
            <button onClick={() => clickHandler("DECREASE", data)}>-</button>
          )
        )}
        <span>{quantity}</span>
        
        <button onClick={() => clickHandler("INCREASE", data)}>+</button>
      </div>
    </div>
  );
}

export default BasketCart;
