import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";

import { productQuantity, shortenText } from "../helpers/helper";

import styles from "./Card.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { addItem, decrease, increase, removeItem } from "../features/cart/cartSlice";

function Card({ data }) {
  const { id, image, title, price } = data;
  const state = useSelector((store) => store.cart)
  const despatch = useDispatch()
  const quantity = productQuantity(state, id);

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price}</p>
      <div className={styles.action}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 ? (
            <button onClick={() => despatch(removeItem(data))}>
              <MdDeleteOutline />
            </button>
          ) : (
            quantity > 1 && (
              <button onClick={() => despatch(decrease(data))}>-</button>
            )
          )}
          {quantity !== 0 && <span>{quantity}</span>}
          {quantity === 0 ? (
            <button onClick={() => despatch(addItem(data))}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => despatch(increase(data))}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
