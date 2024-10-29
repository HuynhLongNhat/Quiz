import "./RightContent.scss";
const RightContent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { dataQuiz } = props;
  return (
    <div>
      <div className="border-bottom border-dashed pb-2 text-center fw-bold pt-2 fs-5">
        10:10
      </div>
      <div className="d-flex gap-3 mt-2 flex-wrap question-list">
        {dataQuiz &&
          // eslint-disable-next-line react/prop-types
          dataQuiz.length > 0 &&
          // eslint-disable-next-line react/prop-types
          dataQuiz.map((question, index) => {
            return (
              <div
                key={`question-${index}`}
                className="question border border-gray border
         rounded-circle d-flex  justify-content-center align-items-center"
                //   style="cursor: pointer;"
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
