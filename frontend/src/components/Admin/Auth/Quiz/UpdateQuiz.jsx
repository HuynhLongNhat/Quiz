import { useEffect, useState } from "react";
import Select from "react-select";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

import {
  getAllQuiz,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const UpdateQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
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
  const [listQuiz, setlistQuiz] = useState([]);
  useEffect(() => {
    fetchAllQuiz();
  }, []);
  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  const fetchAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}  - ${item.description}`,
        };
      });
      setlistQuiz(newQuiz);
    }
  };
  // function urltoFile(url, filename, mimeType) {
  //   return fetch(url)
  //     .then((res) => res.arrayBuffer())
  //     .then((buf) => new File([buf], filename, { type: mimeType }));
  // }
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      //convert base64 to File object
      let newQA = [];

      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            `image/png`
          );
          newQA.push(q);
        }
      }
      setQuestions(newQA);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      // Create a new question with a unique ID and default structure
      const newQuestion = {
        id: uuidv4(),
        description: "",
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
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleSubmitQuestions = async () => {
    console.log(questions);
    try {
      let questionClone = _.cloneDeep(questions);
      for (let i = 0; i < questionClone.length; i++) {
        if (questionClone[i].imageFile) {
          const base64 = await toBase64(questionClone[i].imageFile);
          questionClone[i].imageFile = base64;
        }
      }

      let res = await postUpsertQA({
        quizId: selectedQuiz.value,
        questions: questionClone,
      });
      console.log(questionClone);
      toast.success(res.EM);
      // // Reset the form
      // setSelectedQuiz({});
      // setQuestions([]);
      // setisPreviewImage(false);
    } catch (error) {
      toast.error("Error submitting questions and answers:", error);
    }
  };

  return (
    <div>
      <div className="accordion-item px-5">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            <div className="fw-semibold fs-4">Update Q/A Quizzes</div>
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <div
              className="container p-4 rounded shadow-sm"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              {/* Select Quiz */}
              <div className="mb-4 w-50">
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
                            <label>
                              Question {index + 1} &apos;s Description
                            </label>
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
                            onChange={(e) =>
                              handleOnchangeFileQuestion(question.id, e)
                            }
                          />
                          <span
                            style={{
                              cursor: question.imageName
                                ? "pointer"
                                : "default",
                              color: question.imageName ? "inherit" : "gray",
                            }}
                            onClick={() =>
                              question.imageName &&
                              handlePreviewImage(question.id)
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
                                    e.target.value
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
                    className="btn btn-warning "
                    onClick={() => handleSubmitQuestions()}
                  >
                    Save changes
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
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default UpdateQuiz;
