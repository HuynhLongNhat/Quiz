import { useState } from "react";
import Select from "react-select";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import Question from "../../../Users/Question";
const ManageQuestion = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      image: "",
      imageName: "",
      imageFile: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const [isPreviewImage, setisPreviewImage] = useState(false);
  const [dataImagePreview, setdataImagePreview] = useState({
    title: "",
    url: "",
  });
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      // Create a new question with a unique ID and default structure
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageName: "",
        imageFile: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    } else if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((question) => question.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    // Tìm vị trí của câu hỏi dựa trên questionId
    let questionIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      questionsClone[questionIndex].answers.push(newAnswer);
      setQuestions(questionsClone);
    } else if (type === "REMOVE") {
      // Lọc để lấy các câu trả lời không có answerId cần xóa

      questionsClone[questionIndex].answers = questionsClone[
        questionIndex
      ].answers.filter((answer) => answer.id !== answerId);
      setQuestions(questionsClone);
    }
  };

  const handleOnchangeQuestion = (type, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    // Tìm vị trí của câu h��i dựa trên questionId
    let questionIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );
    if (type === "QUESTION") {
      if (questionIndex > -1) {
        questionsClone[questionIndex].description = value;
      }
    } else if (type === "IMAGE") {
      questionsClone[questionIndex].image = value;
    }
    setQuestions(questionsClone);
  };

  const handleOnchangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    // Tìm vị trí của câu h��i dựa trên questionId
    let questionIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );
    if (questionIndex > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[questionIndex].imageFile = e.target.files[0];
      questionsClone[questionIndex].imageName = e.target.files[0].name;
      console.log(e.target.files[0]);
      setQuestions(questionsClone);
    }
  };

  const handleOnchangeAnswer = (type, questionId, answerId, value) => {
    console.log(type, questionId, answerId, value);
    let questionsClone = _.cloneDeep(questions);
    // Tìm vị trí của câu hỏi dựa trên questionId
    let questionIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );
    if (questionIndex > -1) {
      questionsClone[questionIndex].answers = questionsClone[
        questionIndex
      ].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(questionsClone);
    }
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    // Tìm vị trí của câu h��i dựa trên questionId
    let questionIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );
    if (questionIndex > -1) {
      setdataImagePreview({
        title: questionsClone[questionIndex].description,
        url: questionsClone[questionIndex].imageFile,
      });
      setisPreviewImage(true);
    }
  };
  const handleSubmitQuestions = () => {};

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
          menuPortalTarget={document.body} // Đẩy menu dropdown lên trên
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Tăng z-index
          }}
        />
      </div>

      {/* Add Questions */}
      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter question description"
                      value={question.description}
                      onChange={(e) =>
                        handleOnchangeQuestion(
                          "QUESTION",
                          question.id,
                          e.target.value
                        )
                      }
                    />
                    <label>Question {index + 1} &apos;s Description</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <label
                    className="label-up"
                    htmlFor={`upload-file-${question.id}`}
                  >
                    <span className="fs-2 text-success">
                      <BiSolidImageAdd />
                    </span>
                  </label>
                  <input
                    type="file"
                    hidden
                    id={`upload-file-${question.id}`}
                    onChange={(e) => handleOnchangeFileQuestion(question.id, e)}
                  />
                  <span
                    style={{
                      cursor: question.imageName ? "pointer" : "default",
                      color: question.imageName ? "inherit" : "gray",
                    }}
                    onClick={() =>
                      question.imageName && handlePreviewImage(question.id)
                    }
                  >
                    {question.imageName
                      ? question.imageName
                      : "No file uploaded"}
                  </span>
                </div>
                <div className="col-md-2 d-flex justify-content-center mt-3 mt-md-0">
                  <span
                    className="fs-3 text-success mx-2"
                    onClick={() => handleAddRemoveQuestion("ADD", " ")}
                  >
                    <FaCirclePlus />
                  </span>
                  {questions.length > 1 && (
                    <span
                      className="fs-3 text-danger"
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question.id)
                      }
                    >
                      <FaCircleMinus />
                    </span>
                  )}
                </div>
              </div>

              {/* Answers Section */}
              <div className=" pt-4">
                <h5 className="fw-semibold">Add Answers</h5>
                {question.answers.map((answer, answerIndex) => (
                  <div
                    key={answer.id}
                    className="d-flex align-items-center gap-3 my-2"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={answer.isCorrect}
                      onChange={(e) =>
                        handleOnchangeAnswer(
                          "CHECKBOX",
                          question.id,
                          answer.id,
                          e.target.checked
                        )
                      }
                    />
                    <div className="form-floating flex-grow-1 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter answer text"
                        value={answer.description}
                        onChange={(e) =>
                          handleOnchangeAnswer(
                            "INPUT",
                            question.id,
                            answer.id,
                            e.target.checked
                          )
                        }
                      />
                      <label>Answer {answerIndex + 1}</label>
                    </div>
                    <div className=" flex-grow-1">
                      <span
                        className="fs-3 text-success mx-2"
                        onClick={() =>
                          handleAddRemoveAnswer("ADD", question.id)
                        }
                      >
                        <FaCirclePlus />
                      </span>
                      {question.answers.length > 1 && (
                        <span
                          className="fs-3 text-danger"
                          onClick={() =>
                            handleAddRemoveAnswer(
                              "REMOVE",
                              question.id,
                              answer.id
                            )
                          }
                        >
                          <FaCircleMinus />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      {questions && questions.length > 0 && (
        <div className="text-end m-4">
          <button
            type="submit"
            className="btn btn-primary "
            onClick={() => handleSubmitQuestions()}
          >
            Save
          </button>
        </div>
      )}
      {isPreviewImage && (
        <Lightbox
          image={URL.createObjectURL(dataImagePreview.url)}
          title={dataImagePreview.title}
          onClose={() => setisPreviewImage(false)}
        ></Lightbox>
      )}
    </div>
  );
};

export default ManageQuestion;
