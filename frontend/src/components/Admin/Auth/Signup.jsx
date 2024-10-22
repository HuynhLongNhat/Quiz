import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSignUp = async (data) => {
    try {
      let res = await dispatch(
        signUpUser({
          email: data.email,
          username: data.username,
          password: data.password,
        })
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

  // Watch password value for password confirmation
  const password = watch("password", "");

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
            <form onSubmit={handleSubmit(handleSignUp)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  key={showPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                      message:
                        "Password must be at least 8 characters long, contain at least one uppercase letter and one special character",
                    },
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

              <div className="mb-3 position-relative">
                <label htmlFor="repassword" className="form-label">
                  Re-enter Password
                </label>

                <input
                  type={showRePassword ? "text" : "password"}
                  key={showRePassword ? "text" : "password"}
                  className={`form-control ${
                    errors.repassword ? "is-invalid" : ""
                  }`}
                  id="repassword"
                  {...register("repassword", {
                    required: "Re-enter password is required",
                    validate: (value) =>
                      value === password || "Passwords must match",
                  })}
                />
                {/* Biểu tượng mắt */}
                <span
                  className="position-absolute top-50 end-0 translate-middle-y m-3 "
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowRePassword(!showRePassword)}
                >
                  {showRePassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.repassword && (
                  <div className="invalid-feedback">
                    {errors.repassword.message}
                  </div>
                )}
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-dark">
                  Sign Up
                </button>
              </div>
              <div className="my-3 text-center">
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
};

export default Signup;
