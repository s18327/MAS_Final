import Container from "react-bootstrap/Container";
import { OrderRow } from "./components/OrderRow";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Toaster } from "react-hot-toast";
import Row from "react-bootstrap/Row";
import { API_URL } from "./constants";
import axios from "axios";

/**
 * @function App - Main App component that renders the Orders table
 * @returns JSX.Element
 */
export default function App() {
  const [orderList, setOrderList] = useState([]);
  const [buildersList, setBuildersList] = useState([]);

  const [sortById, setSortById] = useState(false);
  const [sortByCustomer, setSortByCustomer] = useState(false);
  const [sortByPaid, setSortByPaid] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByStatus, setSortByStatus] = useState(false);

  const sortOrdersById = () => {
    const orders = [...orderList];
    const sortedOrders = orders.sort((a, b) => {
      if (a.id > b.id) {
        return sortById ? 1 : -1;
      }
      if (a.id < b.id) {
        return sortById ? -1 : 1;
      }
      return 0;
    });
    setSortById(!sortById);
    setOrderList(sortedOrders);
  };

  const sortOrdersByCustomer = () => {
    const orders = [...orderList];
    const sortedOrders = orders.sort((a, b) => {
      if (a.customer.name > b.customer.name) {
        return sortByCustomer ? 1 : -1;
      }
      if (a.customer.name < b.customer.name) {
        return sortByCustomer ? -1 : 1;
      }
      return 0;
    });
    setSortByCustomer(!sortByCustomer);
    setOrderList(sortedOrders);
  };

  const sortOrdersByPaid = () => {
    const orders = [...orderList];
    const sortedOrders = orders.sort((a, b) => {
      if (a.isPaid > b.isPaid) {
        return sortByPaid ? 1 : -1;
      }
      if (a.isPaid < b.isPaid) {
        return sortByPaid ? -1 : 1;
      }
      return 0;
    });
    setSortByPaid(!sortByPaid);
    setOrderList(sortedOrders);
  };

  const sortOrdersByDate = () => {
    const orders = [...orderList];
    const sortedOrders = orders.sort((a, b) => {
      if (a.toBeReadyAt > b.toBeReadyAt) {
        return sortByDate ? 1 : -1;
      }
      if (a.toBeReadyAt < b.toBeReadyAt) {
        return sortByDate ? -1 : 1;
      }
      return 0;
    });
    setSortByDate(!sortByDate);
    setOrderList(sortedOrders);
  };
  const sortOrdersByStatus = () => {
    const orders = [...orderList];
    const sortedOrders = orders.sort((a, b) => {
      if (a.status > b.status) {
        return sortByStatus ? 1 : -1;
      }
      if (a.status < b.status) {
        return sortByStatus ? -1 : 1;
      }
      return 0;
    });
    setSortByStatus(!sortByStatus);
    setOrderList(sortedOrders);
  };

  /**
   * Fetch all orders from the API
   * and sort them by id
   */
  const getOrders = async () => {
    await axios.get(`${API_URL}/order`).then((response) => {
      const orders = response.data;
      const sortedOrders = orders.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
      setOrderList(sortedOrders);
    });
  };

  //fetches all builders from the API
  const getBuilders = async () => {
    await axios.get(`${API_URL}/pcbuilder`).then((response) => {
      setBuildersList(response.data);
    });
  };

  // useEffect runs once when the component loads
  useEffect(() => {
    getOrders();
    getBuilders();
  }, []);

  return (
    <Container>
      <Toaster position="top-center" />
      <Row>
        <p id="userName" className="mr-1"></p>
        <i className="bi bi-box-arrow-in-right" role="button"></i>
      </Row>
      <Row>
        <h1>Orders</h1>
      </Row>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th onClick={() => sortOrdersById()} style={{ cursor: "pointer" }}>
              Id
            </th>
            <th
              onClick={() => sortOrdersByCustomer()}
              style={{ cursor: "pointer" }}
            >
              Customer
            </th>
            <th
              onClick={() => sortOrdersByPaid()}
              style={{ cursor: "pointer" }}
            >
              Is Paid
            </th>
            <th>Builder</th>
            <th
              onClick={() => sortOrdersByDate()}
              style={{ cursor: "pointer" }}
            >
              Delivery date
            </th>
            <th
              onClick={() => sortOrdersByStatus()}
              style={{ cursor: "pointer" }}
            >
              Status
            </th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <OrderRow order={order} builders={buildersList} key={order.id} /> // populate the table with the orders
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
