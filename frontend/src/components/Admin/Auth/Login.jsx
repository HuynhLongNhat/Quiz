import { useState } from "react";
// Thêm file CSS để tùy chỉnh
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../services/apiService";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await postLogin(email, password);
      console.log(res);
      if (res && +res.EC === 0) {
        toast.success(res.EM);
        navigate("/");
      }
      if (res && +res.EC !== 0) {
        toast.error(res.EM);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-end w-100">
          <span>Don&apos;t have an account yet?</span>
          <button className="btn btn-light mx-3 border-dark">Login</button>
          <button className="btn btn-dark">Signup</button>
        </div>
        <div className="greeting text-center fs-3">Long Nhat</div>
        <div className="welcome text-center mt-2 mb-4">
          Hello, who&apos;s this?
        </div>

        <div className="card w-50 p-4 shadow-lg">
          <div className="card-body">
            <h3 className="text-center mb-4">Login</h3>
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
              <div className="my-3 ">
                <span>Forgot your password?</span>
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark"
                  onClick={(e) => handleLogin(e)}
                >
                  Login
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

export default Login;
