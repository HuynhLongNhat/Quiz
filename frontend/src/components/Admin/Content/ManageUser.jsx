import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaCirclePlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { getListUser } from "../../../services/apiService";
import { toast } from "react-toastify";
const ManageUser = () => {
  const [show, setShow] = useState(false);
  const [listUsers, setListUsers] = useState();
  useEffect(() => {
    GetAllListUser();
  }, []);

  const GetAllListUser = async () => {
    let res = await getListUser();
    if (res && res.EC === 0) {
      setListUsers(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

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
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser
          fetchListUser={GetAllListUser}
          show={show}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default ManageUser;
