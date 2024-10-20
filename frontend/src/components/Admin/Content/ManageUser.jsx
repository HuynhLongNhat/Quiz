import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
const ManageUser = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="manange-user-container">
      <div className="title">
        Manage User
        <div className="users-content">
          <div>
            <button onClick={handleShow}>Add new users</button>
          </div>

          <div>table user</div>
          <ModalCreateUser show={show} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
