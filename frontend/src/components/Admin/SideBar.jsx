/* eslint-disable react/prop-types */
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";

import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Long Nhật
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              <NavLink className="nav-link" to="/admins">
                Dashboard
              </NavLink>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                <NavLink className="nav-link" to="/admins/manage-users">
                  Quản lý Users
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink className="nav-link" to="/admins/manage-quizzes">
                  Quản lý Bài Quiz
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink className="nav-link" to="/admins/manage-questions">
                  Quản lý Câu hỏi
                </NavLink>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/HuynhLongNhat/Quiz"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; Long Nhật
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
