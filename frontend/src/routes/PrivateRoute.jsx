import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.user?.userInfo?.DT?.access_token
  );
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>{props.children}</div>;
};

export default PrivateRoute;
