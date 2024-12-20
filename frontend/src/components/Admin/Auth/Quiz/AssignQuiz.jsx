import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuiz,
  getListUser,
  postAssignQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
const AssignQuiz = () => {
  const [listQuiz, setlistQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setlistUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    fetchAllQuiz();
    fetchAllUser();
  }, []);

  const fetchAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setlistQuiz(newQuiz);
    }
  };

  const fetchAllUser = async () => {
    let res = await getListUser();

    if (res && res.EC === 0) {
      let user = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}  - ${item.username} - ${item.email}`,
        };
      });
      setlistUser(user);
    }
  };

  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);

    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="row">
      <div className="mb-4 col-6">
        <label className="form-label fw-semibold">Select Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
          placeholder="Choose a quiz"
          menuPortalTarget={document.body} // Đẩy menu dropdown lên trên
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Tăng z-index
          }}
        />
      </div>
      <div className="mb-4 col-6">
        <label className="form-label fw-semibold">Select User:</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
          placeholder="Choose a user"
          menuPortalTarget={document.body} // Đẩy menu dropdown lên trên
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Tăng z-index
          }}
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => handleAssign()}>
          Assign Quiz
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
