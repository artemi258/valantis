import { useEffect, useState } from "react";
import { Button, Input } from "..";
import { withoutDuplicates } from "../../utils/withoutDuplicates";
import { API } from "../../api/api";

import styles from "./filter.module.css";

export const Filter = ({
  filter,
  offset,
  setProducts,
  setLoading,
  setFilter,
  setOffset,
}) => {
  const [productValue, setProductValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [ids, setIds] = useState([]);
  const values = {
    product: productValue,
    price: +priceValue,
    brand: brandValue,
  };
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFilter(true);
    setOffset(0);
    const target = e.currentTarget;
    const filter = target.getAttribute("data-filter");
    API.getIdsByFilter(filter, values[filter])
      .then((ids) => {
        setIds(ids.result);
        return ids;
      })
      .then((ids) => API.getItems(ids.result.slice(0, 50)))
      .catch(async () => {
        const ids = await API.getIdsByFilter(filter, values[filter]);
        setIds(ids.result);
        return await API.getItems(ids.result.slice(0, 50));
      })
      .then((items) => {
        const filteredItems = withoutDuplicates(items);

        setProducts(filteredItems);
      })
      .finally(() => setLoading(false));
  };

  const fetchingProductsByFilter = () => {
    setLoading(true);
    console.log(offset);
    API.getItems(ids.slice(offset, offset + 50))
      .catch(() => API.getItems(ids.slice(offset, offset + 50)))
      .then((res) => setProducts(res.result))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    filter && fetchingProductsByFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <div className={styles.root}>
      <span>Фильтры:</span>
      <form data-filter="product" onSubmit={submit}>
        <label htmlFor="byName">по наименованию</label>
        <Input
          onChange={(e) => setProductValue(e.target.value)}
          value={productValue}
          name="product"
          id="byName"
        />
        <Button>Применить</Button>
      </form>
      <form data-filter="price" onSubmit={submit}>
        <label htmlFor="byPrice">по цене</label>
        <Input
          onChange={(e) => setPriceValue(e.target.value)}
          value={priceValue}
          name="price"
          id="byPrice"
        />
        <Button>Применить</Button>
      </form>
      <form data-filter="brand" onSubmit={submit}>
        <label htmlFor="byBrand">по бренду</label>
        <Input
          onChange={(e) => setBrandValue(e.target.value)}
          value={brandValue}
          name="brand"
          id="byBrand"
        />
        <Button>Применить</Button>
      </form>
    </div>
  );
};
