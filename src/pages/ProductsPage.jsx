import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchProducts } from "../features/product/productSlice";

import {
  filterProducts,
  getInitialQuery,
  seachProducts,
} from "../helpers/helper";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const dispach = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  // console.log(state);

  // const products = useProducts();
  // const products = [];

  const [search, setSearch] = useState("");
  const [displayde, setDisplayde] = useState([]);
  const [query, setQuery] = useState({});

  const [searchParams, setSearchparams] = useSearchParams();

  useEffect(() => {
    dispach(fetchProducts());
  }, []);

  useEffect(() => {
    setDisplayde(products);

    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchparams(query);
    setSearch(query.search || "");
    let finalFilter = seachProducts(products, query.search);
    finalFilter = filterProducts(finalFilter, query.category);

    setDisplayde(finalFilter);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {!!displayde.length && displayde.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
