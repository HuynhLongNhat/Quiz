import { useState } from "react";
import Select from "react-select";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageQuestion = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div
      className="container p-4 rounded shadow-sm"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <h3 className="mb-4 text-primary fw-bold">Manage Questions</h3>

      {/* Select Quiz */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Select Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={options}
          placeholder="Choose a quiz"
        />
      </div>

      {/* Add Question */}
      <div className="row align-items-center mb-4">
        <h5 className="mb-3 fw-semibold">Add New Question</h5>
        <div className="col-md-6">
          <div className="form-floating mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter question description"
            />
            <label>Description</label>
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" />
        </div>
        <div className="col-md-2 d-flex justify-content-center mt-3 mt-md-0">
          <span className="fs-3 text-success mx-2">
            <FaCirclePlus />
          </span>
          <span className="fs-3 text-danger mx-2">
            <FaCircleMinus />
          </span>
        </div>
      </div>

      {/* Answers Section */}
      <div className="border-top pt-4">
        <h5 className="fw-semibold">Add Answers</h5>
        <div className="d-flex align-items-center gap-3 my-2">
          <input type="checkbox" className="form-check-input me-2" />
          <div className="form-floating flex-grow-1">
            <input
              type="text"
              className="form-control"
              placeholder="Enter answer text"
            />
            <label>Answer 1</label>
          </div>
          <span className="fs-3 text-success mx-2">
            <FaCirclePlus />
          </span>
          <span className="fs-3 text-danger mx-2">
            <FaCircleMinus />
          </span>
        </div>

        {/* Additional answer inputs */}
        <div className="d-flex align-items-center gap-3 my-2">
          <input type="checkbox" className="form-check-input me-2" />
          <div className="form-floating flex-grow-1">
            <input
              type="text"
              className="form-control"
              placeholder="Enter answer text"
            />
            <label>Answer 2</label>
          </div>
          <span className="fs-3 text-success mx-2">
            <FaCirclePlus />
          </span>
          <span className="fs-3 text-danger mx-2">
            <FaCircleMinus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
