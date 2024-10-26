import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";

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

  const resetData = () => {
    setName("");
    setDescription("");
    setLevel(options[0]);
    setImage(null);
  };

  const handleUploadFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    let res = await postCreateNewQuiz(name, description, level?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      resetData();
    } else {
      toast.error(res.EM);
    }
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
                  Add New Quiz
                </legend>
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
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div>
        <div className="form-floating mb-3">
          <div className="mt-5">
            <p className="fs-4 text-center fw-bold">List Quiz</p>
            <TableQuiz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuiz;
