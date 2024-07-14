import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/masuk" state={{ from: location.pathname }} />;
  }

  return children;
};

export default Auth;
