
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const defaultMessage = "Hi, this is BikesforRefugees. Bikes are now available for you to pick up. Please click LINK to choose a pick up date. For any questions, please contact 07900000000.";

function SMSModal(props) {
    const [show, setShow] = useState(false);

    const [message, setMessage] = useState(() => {
      const localMessage = localStorage.getItem("message");
      if (localMessage) {
        return localMessage;
      }
      return defaultMessage;
    });


    useEffect(() => {
      localStorage.setItem("message", message);
    }, [message]);

    const handleChange = (e) => {
      setMessage(e.target.value);
    };

    const hideModal = () => setShow(false);
    const showModal = () => setShow(true);

    function handleSubmit () {

      const newMessageRequest = {
          ids : props.selectedClients,
          message,
        };

      fetch ("/api/send-messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessageRequest),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
        })
        .then(() => {
            props.onSMSSent();
          })
        .catch(() => {
            props.onSMSFailed();
          })
        .finally(() => {
          hideModal();
        });
    }



    return (
      <>
        <Button variant="primary" onClick={showModal} disabled={props.selectedClients.length === 0}>
          Send SMS
        </Button>

        <Modal show={show} onHide={hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Send SMS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label className="form-text text-muted" htmlFor="text">Enter your message</label>
              <textarea className="form-control border-radius" id='text' name='text' value={message} onChange={handleChange} />
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


