import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import User from "./components/Users/User.jsx";
import Admin from "./components/Admin/Admin.jsx";
import HomePage from "./components/Home/HomePage.jsx";
import ManageUser from "./components/Admin/Content/ManageUser.jsx";
import DashBoard from "./components/Admin/Content/DashBoard.jsx";
import Login from "./components/Admin/Auth/Login.jsx";
import SignUp from "./components/Admin/Auth/Signup.jsx";
import ListQuiz from "./components/Users/ListQuiz.jsx";
import DetailQuiz from "./components/Users/DetailQuiz.jsx";
import Notfound from "./components/NotFound/Notfound.jsx";
import ManageQuiz from "./components/Admin/Auth/Quiz/ManageQuiz.jsx";

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Layout;
