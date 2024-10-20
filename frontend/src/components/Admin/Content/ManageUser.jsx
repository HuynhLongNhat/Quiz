import { useEffect, useState } from "react";
import ModalUser from "./ModalUser";
import "./ManageUser.scss";
import { FaCirclePlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { getListUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import ModalConfirmDelete from "./ModalConfirmDelete";
const ManageUser = () => {
  const [show, setShow] = useState(false);
  const [listUsers, setListUsers] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);
  const [isView, setIsView] = useState(false);
  const [userData, setUserData] = useState(null);
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

  const handleTongleModalConfirm = () => {
    setShowModalConfirm(!isShowModalConfirm);
  };
  const handleDeleteUser = (user) => {
    handleTongleModalConfirm();
    setUserData(user);
  };
  const handleCreateUser = () => {
    setIsUpdate(false);
    setIsView(false);
    setUserData(null);
    setShow(true);
  };
  const handleEditUser = (user) => {
    setIsUpdate(true);
    setUserData(user);
    setShow(true);
  };

  const handleViewUser = (user) => {
    setIsView(true);
    console.log(" user view", user);
    setUserData(user);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  return (
    <div className="manange-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={handleCreateUser}>
            <FaCirclePlus /> Add new users
          </button>
        </div>

        <div className="table-users-container">
          <TableUser
            listUsers={listUsers}
            handleEditUser={handleEditUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
        <ModalUser
          fetchListUser={GetAllListUser}
          show={show}
          handleClose={handleClose}
          isUpdate={isUpdate}
          userData={userData}
          isView={isView}
        />
        <ModalConfirmDelete
          show={isShowModalConfirm}
          handleClose={handleTongleModalConfirm}
          userData={userData}
          fetchListUser={GetAllListUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
