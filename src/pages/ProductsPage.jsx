import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import Card from "../components/Card";

import styles from "./ProductsPage.module.css";
import Loader from "../components/Loader";

import {
  filterProducts,
  getInitialQuery,
  seachProducts,
} from "../helpers/helper";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

function ProductsPage() {
  const products = useProducts();

  const [search, setSearch] = useState("");
  const [displayde, setDisplayde] = useState([]);
  const [query, setQuery] = useState({});

  const [searchParams, setSearchparams] = useSearchParams();

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
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayde.length && <Loader />}
          {displayde.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
