import { useState } from "react";
import Select from "react-select";
import {
  postCreateNewQuiz,
  postUpdateQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import ModalConfirmDeleteQuiz from "./ModalConfirmDeleteQuiz";
import AssignQuiz from "./AssignQuiz"; // Import the new component

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(options[0]);
  const [image, setImage] = useState(null);
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [quizId, setQuizId] = useState(null);

  const resetData = () => {
    setName("");
    setDescription("");
    setLevel(options[0]);
    setImage(null);
    setIsEditMode(false);
    setQuizId(null);
  };

  const handleUploadFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    let res;
    if (isEditMode) {
      res = await postUpdateQuiz(
        quizId,
        name,
        description,
        level?.value,
        image
      );
    } else {
      res = await postCreateNewQuiz(name, description, level?.value, image);
    }

    if (res && res.EC === 0) {
      toast.success(res.EM);
      resetData();
    } else {
      toast.error(res.EM);
    }
  };

  const handleToggleModalConfirm = () => {
    setShowModalConfirm(!isShowModalConfirm);
  };

  const handleDeleteQuiz = (quiz) => {
    handleToggleModalConfirm();
    setQuizData(quiz);
  };

  const handleEditQuiz = (quiz) => {
    setName(quiz.name);
    setDescription(quiz.description);
    setLevel(options.find((option) => option.value === quiz.difficulty));
    setImage(null);
    setIsEditMode(true);
    setQuizId(quiz.id);
  };

  return (
    <div className="p-3">
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              <div className="fw-semibold fs-4">Manage Quizzes</div>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3 fs-6">
                  {isEditMode ? "Update Quiz" : "Add New Quiz"}
                </legend>
                {/* Form Fields */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="your quiz name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    value={level}
                    onChange={(selectedOption) => setLevel(selectedOption)}
                    options={options}
                    placeholder="Choose a level..."
                  />
                </div>
                <div className="more-action form-group">
                  <label className="mb-1">Upload Image</label>
                  <input
                    onChange={handleUploadFile}
                    type="file"
                    className="form-control"
                  />
                </div>
                <div className="mt-3 text-end">
                  <button
                    className="btn btn-warning"
                    onClick={handleSubmitQuiz}
                  >
                    {isEditMode ? "Update" : "Save"}
                  </button>
                </div>

                <hr />
                <div className="mt-5">
                  <p className="fs-4 text-center fw-bold">List Quiz</p>
                  <TableQuiz
                    handleDeleteQuiz={handleDeleteQuiz}
                    handleEditQuiz={handleEditQuiz}
                  />
                  <ModalConfirmDeleteQuiz
                    show={isShowModalConfirm}
                    handleClose={handleToggleModalConfirm}
                    quizData={quizData}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* New Accordion Section for Assign Quiz */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              <div className="fw-semibold fs-4">Assign Quiz</div>
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <AssignQuiz />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuiz;
