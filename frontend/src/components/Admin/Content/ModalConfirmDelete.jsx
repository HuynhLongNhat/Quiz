import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalConfirmDelete = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    show,
    handleClose,
    userData,
    fetchListUser,
    fetchListUserWithPaginate,

    setCurrentPage,
  } = props;
  const confirmDelete = async () => {
    let resDelete = await deleteUser(userData.id);
    console.log(resDelete);
    if (resDelete && resDelete.EC === 0) {
      toast.success(resDelete.EM);

      handleClose();
      await fetchListUserWithPaginate(1);
      setCurrentPage(1);
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
          <Modal.Title>Confirm delete the User !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Are you sure to delete this user with email{" "}
            <b>{userData && userData.email ? userData.email : ""}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => confirmDelete()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirmDelete;
