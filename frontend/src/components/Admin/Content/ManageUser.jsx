import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
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
            <ModalCreateUser show={show} handleClose={handleClose} />
          </div>

          <div>table user</div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
