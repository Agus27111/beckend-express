import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = (props) => {
  const auth = secureLocalStorage.getItem("acessToken");
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return props.children;
};

export default ProtectedRoute;
