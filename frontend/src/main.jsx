// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import User from "./components/Users/User.jsx";
import Admin from "./components/Admin/Admin.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/users" element={<User />} />
        <Route path="/admins" element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>,
);
