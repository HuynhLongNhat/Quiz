import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  console.log(location);
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
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      console.log("data", data);
    } else {
      console.error("Error fetching data quiz:", res.EM);
    }
  };

  return (
    <div className="d-flex gap-3 p-5">
      <div className="left-content">
        <div className="fs-1 fw-semibold">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="">
          <img />
        </div>
        <div className="q-content">
          <div className="fs-5 fw-semibold">How are you doing ?</div>
          <div className="answer">
            <div className="a-child"></div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-primary ">Next</button>
          <button className="btn btn-secondary ">Prev</button>
        </div>
      </div>
      <div className="right-content"></div>
    </div>
  );
};

export default DetailQuiz;
