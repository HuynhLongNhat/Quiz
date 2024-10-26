import { useState } from "react";
import Select from "react-select";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
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
      description: "Question 1 ",
      image: "",
      imageName: "",
      imageFile: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 1",
          isCorrect: false,
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Question 2 ",
      image: "",
      imageName: "",
      imageFile: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      // Create a new question with a unique ID and default structure
      const newQuestion = {
        id: uuidv4(),
        description: `Question ${questions.length + 1}`,
        image: "",
        imageName: "",
        imageFile: "",
        answers: [
          {
            id: uuidv4(),
            description: "Answer 1",
            isCorrect: false,
          },
          {
            id: uuidv4(),
            description: "Answer 2",
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
    console.log(
      " type: " + type + ", questionId: " + questionId,
      " answer :",
      answerId
    );
    let questionsClone = _.cloneDeep(questions);
    // Tìm vị trí của câu hỏi dựa trên questionId
    let questionIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: `Answer ${
          questionsClone[questionIndex].answers.length + 1
        }`,
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
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].description = e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                    <label>Question {index + 1} &apos;s Description</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="label-up" htmlFor={`upload-file-${index}`}>
                    <span className="fs-2 text-success">
                      <BiSolidImageAdd />
                    </span>
                  </label>
                  <input
                    type="file"
                    hidden
                    id={`upload-file-${index}`}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].imageFile = e.target.files[0];
                      newQuestions[index].imageName =
                        e.target.files[0]?.name || "";
                      setQuestions(newQuestions);
                    }}
                  />
                  <span>{question.imageName || "No file uploaded"}</span>
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
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[index].answers[answerIndex].isCorrect =
                          !answer.isCorrect;
                        setQuestions(newQuestions);
                      }}
                    />
                    <div className="form-floating flex-grow-1 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter answer text"
                        value={answer.description}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].answers[answerIndex].description =
                            e.target.value;
                          setQuestions(newQuestions);
                        }}
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
    </div>
  );
};

export default ManageQuestion;
