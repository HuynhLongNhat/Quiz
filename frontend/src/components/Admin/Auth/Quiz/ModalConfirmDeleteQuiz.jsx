/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
const ModalConfirmDeleteQuiz = (props) => {
  // eslint-disable-next-line react/prop-types
  const { show, handleClose, quizData } = props;
  console.log("quiz data", quizData);

  const confirmDeleteQuiz = async () => {
    let resDeleteQuiz = await deleteQuiz(quizData.id);
    if (resDeleteQuiz && resDeleteQuiz.EC === 0) {
      toast.success(resDeleteQuiz.EM);
      handleClose();
    } else {
      toast.error(resDeleteQuiz.EM);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the Quiz !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Are you sure to delete this quiz with name{" "}
            <b>{quizData && quizData.name ? quizData.name : ""}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => confirmDeleteQuiz()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirmDeleteQuiz;
