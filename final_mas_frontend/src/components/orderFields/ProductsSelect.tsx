import { Button, Modal } from "react-bootstrap";
import { ProductsView } from "./ProductsView";
/**
 * @function ProductSelect - Component that renders the popup window to display products for the order
 * @param props - props object
 * @returns JSX.Element
 */
export const ProductsSelect = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Product list
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductsView order={props.order} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
