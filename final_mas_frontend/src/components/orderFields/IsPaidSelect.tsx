import axios from "axios";
import { API_URL } from "src/constants";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
import { useState } from "react";

/**
 * @function changePaidStatus - Change payed order status
 * @param orderId - order id
 * @param state - new state of payment [boolean]
 */
const changePaidStatus = (orderId: number, state: boolean) =>
  new Promise(async (resolve, reject) => {
    await axios
      .post(`${API_URL}/order/${orderId}/paid`, { paid: state })
      .then((response) => {
        if (response?.status === 200) {
          resolve("success");
        } else {
          reject("error");
        }
      });
  });

/**
 * @function IsPaidSelect - Select if order is paid
 * @param order - order that we want to change payment status for
 * @param initial - initial state of payment
 * @returns JSX.Element
 */
export const IsPaidSelect = ({ order, initial }) => {
  const [val, setVal] = useState(initial === 1 ? true : false);
  //handles change of payment status
  const handleOnChange = async (event) => {
    const isPaid: boolean = event.target.checked;
    console.log(order.id);
    toast.promise(changePaidStatus(order.id, isPaid), {
      loading: "Saving...",
      success: () => {
        setVal(isPaid);
        return <b>Changed order payment status!</b>;
      },
      error: <b>Could not change the payment status.</b>,
    });
  };

  return (
    <Form.Check
      type="switch"
      checked={val}
      onChange={handleOnChange}
      disabled={val}
    />
  );
};
