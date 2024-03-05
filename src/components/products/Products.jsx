import { useEffect, useState } from "react";
import { API } from "../../api/api";
import { Button, ProductsItem, Filter } from "..";
import { withoutDuplicates } from "../../utils/withoutDuplicates";

import styles from "./products.module.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    API.getIds(offset, 50)
      .then((ids) => API.getItems(ids.result))
      .catch(async () => {
        const ids = await API.getIds(offset, 50);
        return await API.getItems(ids.result);
      })
      .then((items) => {
        const filteredItems = withoutDuplicates(items);

        setProducts(filteredItems);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    !filter && fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  return (
    <>
      <Filter
        filter={filter}
        offset={offset}
        setFilter={setFilter}
        setProducts={setProducts}
        setLoading={setLoading}
        setOffset={setOffset}
      />
      <div className={styles.root}>
        <div className={styles.names}>
          <div>id</div>
          <div>name</div>
          <div>price</div>
          <div>brand</div>
        </div>
        <ul className={styles.products}>
          {!!products.length &&
            !loading &&
            products.map(({ id, product, price, brand }) => (
              <ProductsItem
                key={id}
                id={id}
                name={product}
                price={price}
                brand={brand}
              />
            ))}
        </ul>
      </div>
      {!products.length && !loading && <div className={styles.text}>пусто</div>}
      {loading && <div className={styles.loading}>Загрузка...</div>}
      <div className={styles.pageNumber}>Страница №{offset / 50 + 1}</div>
      {!loading && (
        <div className={styles.btns}>
          <Button
            disabled={!!!offset}
            onClick={() => setOffset((state) => state - 50)}
            className={styles.btn}
          >
            prev
          </Button>
          <Button
            onClick={() => setOffset((state) => state + 50)}
            className={styles.btn}
            disabled={!!!products.length}
          >
            next
          </Button>
        </div>
      )}
    </>
  );
};
