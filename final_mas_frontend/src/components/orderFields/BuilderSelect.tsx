import Form from "react-bootstrap/Form";
import { API_URL } from "src/constants";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

/**
 * @function changeBuilder - Change builder for order
 * @param orderId - order id
 * @param builder - builder id
 */
const changeBuilder = (orderId, builder) =>
  new Promise(async (resolve, reject) => {
    await axios
      .put(`${API_URL}/order/${orderId}/assignPcBuilder/${builder}`)
      .then((response) => {
        if (response?.data.success === true) {
          resolve("success");
        } else {
          if (response.data.message === "has")
            reject("Order already has an assigned builder!");
          if (response.data.message === "lowTier")
            reject("Pc Builders skill tier too low!");
        }
      });
  });

/**
 * @function BuilderSelect - Select builder for order
 * @param builders - list of builders
 * @param initial - initial builder
 * @param orderId - order id
 * @returns JSX.Element
 */
export const BuilderSelect = ({ builders, initial, orderId }) => {
  const [val, setVal] = useState(initial ?? "");
  // handles change of builder
  const handleOnChange = async (event) => {
    console.info(event.target.value);
    const builder = event.target.value;
    if (!builder) {
      return;
    }
    toast.promise(changeBuilder(orderId, builder), {
      loading: "Saving...",
      success: () => {
        setVal(builder);
        return <b>Builder saved!</b>;
      },
      error: (err) => {
        return <b>{err}</b>;
      },
    });
  };

  return (
    <Form.Select value={val} onChange={handleOnChange} disabled={!!val}>
      <option value={""}>-</option>
      {builders.map((builder) => (
        <option value={builder.id} key={builder.id}>
          {builder.name}
        </option>
      ))}
    </Form.Select>
  );
};
