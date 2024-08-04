const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join(" ");
};

const seachProducts = (products, search) => {
  if (!search) return products;
  const seachedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );
  return seachedProducts;
};

const filterProducts = (products, category) => {
  if (category === "all" || !category) return products;
  const filteredProducts = products.filter((p) => p.category === category);
  return filteredProducts;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

const sumProducts = (product) => {
  const itemsCounter = product.reduce((acc, cur) => acc + cur.quantity, 0);
  const total = product
    .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    .toFixed(2);
  return { itemsCounter, total };
};

const productQuantity = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return 0;
  }
  return state.selectedItems[index].quantity;
};

export {
  shortenText,
  seachProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  sumProducts,
  productQuantity,
};
