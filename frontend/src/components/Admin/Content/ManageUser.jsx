import { useEffect, useState } from "react";
import ModalUser from "./ModalUser";
import "./ManageUser.scss";
import { FaCirclePlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { fetchListUserWithPaginate } from "../../../store/slices/userSlice";
import ModalConfirmDelete from "./ModalConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { LIMIT_USER } from "../../../store/slices/userSlice";
const ManageUser = () => {
  const { users, totalPages, totalUsers, loading, error } = useSelector(
    (state) => state.user
  );

  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);
  const [isView, setIsView] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchListUser(currentPage);
    console.log("user  :", totalUsers);
  }, [currentPage, totalUsers]);

  const fetchListUser = async (page) => {
    try {
      await dispatch(
        fetchListUserWithPaginate({ page: page, limit: LIMIT_USER })
      );
    } catch (error) {
      console.error("Error fetching user list:", error);
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
    setUserData(user);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  if (loading) return <p>Đang tải danh sách người dùng...</p>;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;
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
            listUsers={users}
            handleEditUser={handleEditUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
            fetchListUsersWithPaginate={fetchListUser}
            pageCount={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalUser
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          show={show}
          handleClose={handleClose}
          isUpdate={isUpdate}
          userData={userData}
          isView={isView}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalConfirmDelete
          show={isShowModalConfirm}
          handleClose={handleTongleModalConfirm}
          userData={userData}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
