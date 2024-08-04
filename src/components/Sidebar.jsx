import { FaListUl } from "react-icons/fa";

import { createQueryObject } from "../helpers/helper";
import { categorys } from "../constants/list"; 

import styles from "./Sidebar.module.css";



function Sidebar({ query, setQuery }) {
  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const category = e.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };
  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categorys.map((item) => (
          <li key={item.id} className={item.type.toLowerCase() === query.category ? styles.selected : null }>{item.type}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
