import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
const ListQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
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
    <div className="d-flex gap-5 container">
      {listQuiz &&
        listQuiz.length > 0 &&
        listQuiz.map((item, index) => {
          return (
            <div key={item.id} className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${item.image}`}
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{item.description}</p>
                <button className="btn btn-primary">Start now</button>
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
