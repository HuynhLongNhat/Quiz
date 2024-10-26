/* eslint-disable react/prop-types */
import _ from "lodash";
const Question = (props) => {
  const { data, index, handleCheckbox } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleCheckQuestion = (e, answerId, questionId) => {
    handleCheckbox(answerId, questionId);
  };
  return (
    <div>
      {data.image ? (
        <div className="mb-3">
          <img
            className="img-fluid mx-auto rounded shadow d-block w-25 h-full"
            src={`data:image/jpeg;base64,${data.image}`}
          />
        </div>
      ) : (
        <div style={{ width: "200px", height: "160px" }}></div>
      )}
      <div className="fs-5 text-center fw-semibold">
        Question {index + 1}: {data?.questionDescription} ?
      </div>
      <div className="m-5">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer, index) => {
            return (
              <div
                key={`answer-${index}`}
                className="border border-primary rounded p-2 mb-2 d-flex align-items-center"
              >
                <div className="">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={answer.isSelected}
                    onChange={(e) =>
                      handleCheckQuestion(e, answer.id, data.questionId)
                    }
                  />
                  <label className="form-check-label text-right pl-3">
                    {answer.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Question;
