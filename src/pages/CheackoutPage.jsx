import React from 'react'
import { useCart } from '../context/CartContext'
import BasketCart from '../components/BasketCart';

import styles from "./CheackoutPage.module.css"
import { TbChecklist } from 'react-icons/tb';
import { FaHashtag } from 'react-icons/fa';
import { BsPatchCheck } from 'react-icons/bs';

function CheackoutPage() {

  const [{selectedItems, total, itemsCounter, checkout}, despatch] = useCart();

  const clickHandler = (type, data) => {
    despatch({ type: type, payload: data });
  };

  if(!selectedItems.length) return (
    <p>Empty</p>
  )

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <p><TbChecklist /> Total: <span>{total}</span></p>
        <p><FaHashtag /> Quntity: <span>{itemsCounter}</span></p>
        <p><BsPatchCheck /> Status: <span>{!checkout && "pending..."}</span></p>
        <button onClick={() => clickHandler("CHECKOUT")}>Cheackout</button>
      </div>
      <div className={styles.products}>
        {
          selectedItems.map(product => <BasketCart key={product.id} data={product} despatch={despatch} clickHandler={clickHandler} />)
        }
      </div>
    </div>
  )
}

export default CheackoutPage