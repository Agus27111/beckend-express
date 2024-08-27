import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ props }) => {
  const auth = localStorage.getItem("regUser");
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return props.children;
};

export default ProtectedRoute;
