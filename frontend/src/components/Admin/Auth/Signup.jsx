import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      let res = await dispatch(
        signUpUser({ email, username, password })
      ).unwrap();

      if (res && +res.EC === 0) {
        navigate("/login");
      }
      if (res && +res.EC !== 0) {
        navigate("/signup");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="my-5">
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-end w-100">
          <span>Already have an account?</span>

          <button
            className="btn btn-dark mx-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
        <div className="greeting text-center fs-3">Long Nhat</div>
        <div className="welcome text-center mt-2 mb-4">
          Welcome, create your account
        </div>

        <div className="card w-50 p-4 shadow-lg">
          <div className="card-body">
            <h3 className="text-center mb-4">Sign Up</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="repassword" className="form-label">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="repassword"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark"
                  onClick={(e) => handleSignUp(e)}
                >
                  SignUp
                </button>
              </div>
              <div className="my-3 text-center ">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  &#60;&#60; Go to HomePage!
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
