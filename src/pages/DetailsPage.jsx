import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader"

import { useProductDetails } from "../context/ProductContext";
import { SiOpenproject } from "react-icons/si";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

import styles from "./DetailsPage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";

function DetailsPage() {
  const dispach = useDispatch()
  const { id } = useParams();
  const product = useSelector(store => store.product.products.find(i => i.id === +id));
  const { title, price, image, category, description } = product || ""

  useEffect(() => {
    dispach(fetchProducts());
  }, []);

  if(!product) return <Loader />

  return (
    <div className={styles.container}>
      <img src={image} alt="" />
      <div className={styles.information}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.category}><SiOpenproject /> {category}</p>
        <div>
          <span className={styles.price}><IoMdPricetag /> {price} $</span>
          <Link to="/products"><FaArrowLeft /> Back to Shop</Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
