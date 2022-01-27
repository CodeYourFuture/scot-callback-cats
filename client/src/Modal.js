import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function SMSModal() {
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function logWhenClicked() {
      console.log("Send SMS button was clicked");
      }

    function handleSubmit () {
      logWhenClicked();
      handleClose();
      }

    return (
      <>
        <Button variant="primary" onClick={handleShow} disabled={disabled}>
          Send SMS
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Send SMS</Modal.Title>
          </Modal.Header>
          <Modal.Body>Hi, this is Bikes For Refugees. Bikes are now available for you to pick up. Please click LINK to choose a pick up date. For any questions, please contact 07900000000.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type = "submit" onClick={handleSubmit}>
              Send SMS
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default SMSModal;


