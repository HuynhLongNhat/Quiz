import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState();
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)

        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    } else {
      console.error("Error fetching data quiz:", res.EM);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let resutls = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        // todo :usserAnswerId
        question.answers.forEach((answer) => {
          if (answer.isSelected === true) {
            userAnswerId.push(+answer.id);
          }
        });

        resutls.push({ questionId: +questionId, userAnswerId: userAnswerId });
      });
      payload.answers = resutls;
      // submit api
      let res = await postSubmitQuiz(payload);
      console.log("check res :", res);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setIsShowModalResult(!isShowModalResult);
        setDataModal({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
      } else {
        toast.error(res.EM);
      }
    }
  };

  const handleCheckbox = (answerId, questionId) => {
    // Clone dataQuiz để không thay đổi trực tiếp
    let dataQuizClone = _.cloneDeep(dataQuiz);

    // Tìm câu hỏi đang xử lý
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );

    if (question && question.answers) {
      // Duyệt qua các câu trả lời và cập nhật `isSelected` cho câu trả lời được chọn
      question.answers = question.answers.map((answer) => {
        if (+answer.id === +answerId) {
          // Đổi trạng thái `isSelected`
          answer.isSelected = !answer.isSelected;
        }
        return answer;
      });
    }

    // Tìm vị trí của câu hỏi và cập nhật lại
    let questionIndex = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (questionIndex > -1) {
      dataQuizClone[questionIndex] = question;
      setDataQuiz(dataQuizClone); // Cập nhật dataQuiz để re-render
    }
  };

  return (
    <div className="d-flex gap-3 p-5">
      <div style={{ flex: "0 0 70%" }} className="border rounded p-4">
        <div className="fs-4 fw-semibold">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="">
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            handleCheckbox={handleCheckbox}
          />
        </div>
        <div className="d-flex justify-content-center gap-3 mt-5">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div
        style={{ flex: "0 0 30%" }}
        className=" border border-gray rounded p-3"
      >
        <RightContent dataQuiz={dataQuiz} />
      </div>

      <ModalResult
        show={isShowModalResult}
        handleClose={setIsShowModalResult}
        dataModal={dataModal}
      />
    </div>
  );
};

export default DetailQuiz;
