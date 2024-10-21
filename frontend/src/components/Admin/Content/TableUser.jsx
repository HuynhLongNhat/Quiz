/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";
const TableUser = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    listUsers,
    handleEditUser,
    handleViewUser,
    handleDeleteUser,
    fetchListUsersWithPaginate,
    pageCount,
    currentPage,
    setCurrentPage,
  } = props;

  const handlePageClick = (event) => {
    fetchListUsersWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
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
            // eslint-disable-next-line react/prop-types
            listUsers.length > 0 &&
            // eslint-disable-next-line react/prop-types
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <button
                        className="btn btn-info"
                        onClick={() => handleViewUser(item)}
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
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
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
};

export default TableUser;
