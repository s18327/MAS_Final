import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { API_URL } from "../../constants";
import { ProductsRow } from "../ProductRow";

/**
 * @function ProductsView - Component that renders the Products table for the order
 * @param order - order element to display products for
 * @returns JSX.Element
 */
export const ProductsView = (order) => {
  const [products, setProducts] = useState([]);
  const id: number = order.order.id;
  const getProducts = async () => {
    await axios.get(`${API_URL}/order/${id}/products`).then((response) => {
      const data = response.data;
      setProducts(data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <h4>Orders products</h4>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Completed</th>
            <th>Category</th>
            <th>Name</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductsRow product={product} key={product.id} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
