import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../../services/apiService";
import { logout } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Language from "./Language";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.user?.userInfo?.DT?.access_token
  );
  const email = useSelector((state) => state.user?.userInfo?.DT?.email);
  const refresh_token = useSelector(
    (state) => state.user?.userInfo?.DT?.refresh_token
  );
  const navigate = useNavigate();
  const navigateLoginPage = () => {
    navigate("/login");
  };
  const navigateSignUpPage = () => {
    navigate("/signup");
  };
  const handleLogout = async () => {
    let res = await logoutUser(email, refresh_token);
    console.log("res logout ", res);
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(logout());
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Long Nhật
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              {t("header.home")}
            </NavLink>
            <NavLink className="nav-link" to="/users">
              {t("header.users")}
            </NavLink>
            <NavLink className="nav-link" to="/admins">
              {t("header.admin")}
            </NavLink>
          </Nav>
          <Nav>
            <Language />
            {isAuthenticated ? (
              <>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <button
                  className="btn-login"
                  onClick={() => {
                    navigateLoginPage();
                  }}
                >
                  Login
                </button>
                <button
                  className="btn-signup"
                  onClick={() => navigateSignUpPage()}
                >
                  SignUp
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
