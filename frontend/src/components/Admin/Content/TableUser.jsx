import { useEffect, useState } from "react";
import { getListUser } from "../../../services/apiService";
import { toast } from "react-toastify";
const TableUser = () => {
  const [listUsers, setListUsers] = useState();

  useEffect(() => {
    GetAllListUser();
  }, []);

  const GetAllListUser = async () => {
    let res = await getListUser();
    if (res && res.EC === 0) {
      setListUsers(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div>
      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <button className="btn btn-info">Detail</button>
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
