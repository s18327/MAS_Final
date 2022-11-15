/**
 * @function ProductRow - Component for displaying a single product in the product list
 * @param product - product element to be displayed
 * @returns JSX.Element
 */
export const ProductsRow = (product) => {
  const { finalProduct } = product.product;
  const { id, category, specificationFilled } = finalProduct;
  const { name, price } = finalProduct.product;

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{specificationFilled ? "true" : "false"}</td>
      <td>{category}</td>
      <td>{name}</td>
      <td>{price} zł</td>
    </tr>
  );
};
