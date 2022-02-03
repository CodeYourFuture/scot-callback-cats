/* eslint-disable jsx-a11y/label-has-for */
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function SMSModal(props) {
    const [show, setShow] = useState(false);
    const hideModal = () => setShow(false);
    const showModal = () => setShow(true);


    function handleSubmit () {
      console.log(props.checkedCheckboxes);
      hideModal();
      }


    return (
      <>
        <Button variant="primary" onClick={showModal} disabled={props.checkedCheckboxes.length === 0}>
          Send SMS
        </Button>

        <Modal show={show} onHide={hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Send SMS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label className="form-text text-muted" htmlFor="text">Enter your message</label>
              <textarea className="form-control border-radius" id='text' name='text' defaultValue="Hi, this is Bikes For Refugees. Bikes are now available for you to pick up. Please click LINK to choose a pick up date. For any questions, please contact 07900000000." />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Send SMS
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default SMSModal;


