import CountDown from "./CountDown";
import "./RightContent.scss";
import { useRef } from "react";
const RightContent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { dataQuiz, handleFinishQuiz, setIndex } = props;
  const refDiv = useRef([]);

  const onTimeUp = () => {
    handleFinishQuiz();
  };

  const getClassQuestion = (question) => {
    console.log(question);
    // check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected == true);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };
  const handleClickQuestion = (question, index) => {
    setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected == true);
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };
  return (
    <div>
      <div className="border-bottom border-dashed pb-4 text-center fw-bold pt-2 fs-5">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="d-flex gap-3 mt-3 flex-wrap question-list">
        {dataQuiz &&
          // eslint-disable-next-line react/prop-types
          dataQuiz.length > 0 &&
          // eslint-disable-next-line react/prop-types
          dataQuiz.map((question, index) => {
            return (
              <div
                key={`question-${index}`}
                className={getClassQuestion(question)}
                onClick={() => handleClickQuestion(question, index)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightContent;
