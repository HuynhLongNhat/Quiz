import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-toastify/dist/ReactToastify.css";
import Language from "../Header/Language";
import NavDropdown from "react-bootstrap/NavDropdown";
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header d-flex justify-content-between m-3  ">
          <span>
            <FaBars onClick={() => setCollapsed(!collapsed)} />
          </span>
          <div className="d-flex gap-3">
            <div>
              <Language />
            </div>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
