import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getListQuiz();
  }, []);
  const getListQuiz = async () => {
    let res = await getQuizByUser();
    console.log("res", res.DT);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  return (
    <div className="d-flex gap-4 container flex-wrap mx-auto">
      {listQuiz &&
        listQuiz.length > 0 &&
        listQuiz.map((quiz, index) => {
          return (
            <div key={quiz.id} className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${quiz.image}`}
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/quiz/${quiz.id}`, {
                      state: {
                        quizTitle: quiz.description,
                      },
                    });
                  }}
                >
                  Start now
                </button>
              </div>
            </div>
          );
        })}
      {listQuiz && listQuiz.length === 0 && (
        <span>You don&apos;t have any quiz now...</span>
      )}
    </div>
  );
};

export default ListQuiz;
