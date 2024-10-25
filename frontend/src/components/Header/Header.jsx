import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const isAuthenticated = useSelector(
    (state) => state.user?.userInfo?.DT?.access_token
  );
  const navigate = useNavigate();
  const navigateLoginPage = () => {
    navigate("/login");
  };
  const navigateSignUpPage = () => {
    navigate("/signup");
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
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/admins">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
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
