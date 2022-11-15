import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { API_URL } from "src/constants";

const STATUSES = ["created", "preparing", "completed", "cancelled"];

/**
 * @function changeStatus - Change order status
 * @param orderId - order id
 * @param status - new status
 */
const changeStatus = (orderId, status) =>
  new Promise(async (resolve, reject) => {
    await axios
      .put(`${API_URL}/order/${orderId}/statusChange`, { status: status })
      .then((response) => {
        if (response?.data.success === true) {
          resolve("success");
        } else {
          let message = "Something went wrong";
          switch (response.data.message) {
            case "noPayment": {
              message = "Order has not been paid for!";
              break;
            }
            case "noPcBuilder": {
              message = "Pc builder not assigned!";
              break;
            }
            case "notFilled": {
              message = "Order products are not filled!";
              break;
            }
            case "status": {
              message = "No status provided!";
              break;
            }
            case "iStatus": {
              message = "Invalid status!";
              break;
            }
          }
          reject(message);
        }
      });
  });

/**
 * @function StatusSelect - Select order status
 * @param order - order that we want to change status for
 * @param initial - initial status
 * @returns JSX.Element
 */
export const StatusSelect = ({ order, initial }) => {
  const [val, setVal] = useState(initial ?? STATUSES[0]);

  // handles change of status
  const handleOnChange = async (event) => {
    const status: string = event.target.value;
    console.log(status);
    toast.promise(changeStatus(order.id, status), {
      loading: "Saving...",
      success: () => {
        setVal(status);
        return <b>Changed order status!</b>;
      },
      error: (err) => {
        return <b>{err}</b>;
      },
    });
  };

  return (
    <Form.Select
      value={val}
      onChange={handleOnChange}
      disabled={val === STATUSES[2] || val === STATUSES[3]}
      style={{ textTransform: "capitalize" }}
    >
      {STATUSES.map((status) => (
        <option value={status} key={status}>
          {status}
        </option>
      ))}
    </Form.Select>
  );
};
