/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  // eslint-disable-next-line react/prop-types
  const { show, handleClose, dataModal } = props;
  console.log("data:", dataModal);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total question : <b>{dataModal.countTotal}</b>
          </div>
          <div>
            Toal correct answers : <b>{dataModal.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Show answers</Button>
          <Button variant="danger" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
