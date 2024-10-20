/* eslint-disable react/prop-types */
const TableUser = (props) => {
  // eslint-disable-next-line react/prop-types
  const { listUsers } = props;

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
            // eslint-disable-next-line react/prop-types
            listUsers.length > 0 &&
            // eslint-disable-next-line react/prop-types
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
