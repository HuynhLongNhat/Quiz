/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllQuiz } from "../../../../services/apiService";
const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const { handleDeleteQuiz, handleEditQuiz } = props;
  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleViewQuiz = (quiz) => {
    // TODO: Navigate to DetailQuiz page with quiz id
  };

  return (
    <div>
      <table className="table table-hover ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Level</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            // eslint-disable-next-line react/prop-types
            listQuiz.length > 0 &&
            // eslint-disable-next-line react/prop-types
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <button
                        className="btn btn-info"
                        onClick={() => handleViewQuiz(item)}
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditQuiz(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteQuiz(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableQuiz;
