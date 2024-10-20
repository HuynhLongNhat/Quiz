import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaCirclePlus } from "react-icons/fa6";
import TableUser from "./TableUser";
const ManageUser = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="manange-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={handleShow}>
            <FaCirclePlus /> Add new users
          </button>
        </div>

        <div className="table-users-container">
          <TableUser />
        </div>
        <ModalCreateUser show={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default ManageUser;
