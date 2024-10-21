/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { postCreateNewUser, putUpdateUser } from "../../../services/apiService";
const ModalUser = (props) => {
  const {
    show,
    handleClose,
    fetchListUser,
    setCurrentPage,
    isUpdate,
    isView,
    userData,
    fetchListUserWithPaginate,
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const resetData = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage(null);
    setPreviewImage("");
  };

  // Khi mở modal ở chế độ cập nhật, fill thông tin người dùng
  useEffect(() => {
    if ((isUpdate || isView) && userData) {
      setEmail(userData.email);
      setPassword(userData.password);
      setUsername(userData.username);
      setRole(userData.role || "USER");
      setImage(userData.image);
      if (userData.image) {
        setPreviewImage(`data:image/jpeg;base64,${userData.image}`);
      } else {
        setPreviewImage(null);
      }
    } else {
      resetData();
    }
  }, [isUpdate, isView, userData]);

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      //convert ảnh thành dạng blob
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setPreviewImage("");
    }
  };
  // const validateEmail = (email) => {
  //   return String(email)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };
  const handleSumbit = async () => {
    //validate
    // const isValidEmail = validateEmail(email);
    // if (!email) {
    //   toast.error("Email is required");
    //   return;
    // }
    // if (!isValidEmail) {
    //   toast.error("Invalid email");
    //   return;
    // }
    // if (!password) {
    //   toast.error("Password is required");
    //   return;
    // }
    // if (!username) {
    //   toast.error("Username is required");
    //   return;
    // }
    // if (!image) {
    //   toast.error("Image is required");
    //   return;
    // }

    //call apis

    // Gọi API (tạo mới hoặc cập nhật)
    let data;
    if (isUpdate) {
      // Gọi API để cập nhật
      data = await putUpdateUser(userData.id, username, role, image);
    } else {
      // Gọi API để tạo mới
      data = await postCreateNewUser(email, password, username, role, image);
    }

    if (data && data.EC === 0) {
      toast.success(data.EM);
      resetData();
      handleClose();
      await fetchListUserWithPaginate(1);
      setCurrentPage(1);
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <div>
      <Modal
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdate ? "Update user" : isView ? "View user" : "Add new user"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  disabled={isUpdate || isView}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  disabled={isUpdate || isView}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                disabled={isView}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState" className="form-label">
                Role
              </label>
              <select
                id="inputState"
                className="form-select"
                disabled={isView}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Choose...</option>
                <option defaultValue value="USER">
                  USER
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="file-upload">
                <FaCirclePlus /> Upload file Image
              </label>
              <input
                type="file"
                hidden
                disabled={isView}
                className="form-control"
                id="file-upload"
                onChange={(e) => handleUploadImage(e)}
              />
              <div className="col-md-12 img-preview">
                {previewImage ? (
                  <img src={previewImage} />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSumbit()}>
            {isUpdate ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalUser;
