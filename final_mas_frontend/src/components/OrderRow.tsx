import { useState } from "react";
import Button from "react-bootstrap/Button";
import { ProductsSelect } from "./orderFields/ProductsSelect";
import { BuilderSelect } from "./orderFields/BuilderSelect";
import { IsPaidSelect } from "./orderFields/IsPaidSelect";
import { StatusSelect } from "./orderFields/StatusSelect";

/**
 * @function OrderRow - Order row component represents a single order in the orders table
 * @param order - order element to be displayed
 * @param builders - list of builders
 * @returns JSX.Element
 */
export const OrderRow = ({ order, builders }) => {
  const { id, customer, isPaid, pcBuilder, toBeReadyAt, status } = order;

  const [modalShow, setModalShow] = useState(false);

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{customer.name}</td>
      <td>
        <IsPaidSelect order={order} initial={isPaid == true ? 1 : 0} />
      </td>
      <td>
        <BuilderSelect
          builders={builders}
          initial={pcBuilder?.id}
          orderId={id}
        />
      </td>
      <td>{new Date(toBeReadyAt).toISOString().substring(0, 10)}</td>
      <td>
        <StatusSelect order={order} initial={status} />
      </td>
      <td>
        <Button type="button" onClick={() => setModalShow(true)}>
          View
        </Button>
        <ProductsSelect
          order={order}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </td>
    </tr>
  );
};
