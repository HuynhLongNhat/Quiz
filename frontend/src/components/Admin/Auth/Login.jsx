import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner10 } from "react-icons/im";
import "./Login.scss";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // State để kiểm soát việc hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    setIsSubmitting(true);
    try {
      let res = await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();

      if (res && +res.EC === 0) {
        setIsSubmitting(false);
        navigate("/");
      }
      if (res && +res.EC !== 0) {
        setIsSubmitting(false);
        navigate("/login");
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

          <button
            className="btn btn-dark mx-2"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </button>
        </div>
        <div className="greeting text-center fs-3">Long Nhat</div>
        <div className="welcome text-center mt-2 mb-4">
          Hello, who&apos;s this?
        </div>

        <div className="card w-50 p-4 shadow-lg">
          <div className="card-body">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {/* Biểu tượng mắt */}
                <span
                  className="position-absolute top-50 end-0 translate-middle-y m-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="my-3 ">
                <span>Forgot your password?</span>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ImSpinner10 className="loaderIcon" />
                  ) : (
                    <span>Login</span>
                  )}
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
