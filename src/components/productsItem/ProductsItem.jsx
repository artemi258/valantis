import styles from "./productsItem.module.css";

export const ProductsItem = ({ id, brand, name, price }) => {
  return (
    <li className={styles.root}>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}р</div>
      <div>{brand}</div>
    </li>
  );
};
