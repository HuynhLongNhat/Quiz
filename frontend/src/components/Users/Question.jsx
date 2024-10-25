/* eslint-disable react/prop-types */
import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <div>
      {data.image && (
        <div className="mb-3">
          <img
            className="img-fluid rounded shadow d-block w-50 h-full"
            src={`data:image/jpeg;base64,${data.image}`}
          />
        </div>
      )}
      <div className="fs-5 fw-semibold">
        Question {index + 1}: {data?.questionDescription} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer, index) => {
            return (
              <div
                key={`answer-${index}`}
                className={`a-child ${answer.isCorrect ? "correct" : ""}`}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label className="form-check-label">
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
