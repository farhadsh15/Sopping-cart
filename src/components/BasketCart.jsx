import React from "react";
import { shortenText } from "../helpers/helper";

import styles from "./BasketCart.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from "../features/cart/cartSlice";

function BasketCart({ data }) {
  const { title, image, price, quantity } = data;

  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <img src={image} alt={title} />
      <span>{shortenText(title)}</span>
      <span>{price}</span>
      <div className={styles.action}>
        {quantity === 1 ? (
          <button onClick={() => dispatch(removeItem(data))}>
            <MdDeleteOutline />
          </button>
        ) : (
          quantity > 1 && (
            <button onClick={() => dispatch(decrease(data))}>-</button>
          )
        )}
        <span>{quantity}</span>
        
        <button onClick={() => dispatch(increase(data))}>+</button>
      </div>
    </div>
  );
}

export default BasketCart;
