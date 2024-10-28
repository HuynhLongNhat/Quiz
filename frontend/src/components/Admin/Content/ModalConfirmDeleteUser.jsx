/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useDispatch } from "react-redux";
import { removeUser } from "../../../store/slices/userSlice";

const ModalConfirmDeleteUser = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    show,
    handleClose,
    userData,
    fetchListUserWithPaginate,
    setCurrentPage,
  } = props;
  const dispatch = useDispatch();
  const confirmDelete = async () => {
    let resDelete = await dispatch(removeUser(userData.id)).unwrap();
    if (resDelete && resDelete.EC === 0) {
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

export default ModalConfirmDeleteUser;
