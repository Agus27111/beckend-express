import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedLogin = (props) => {
  const auth = secureLocalStorage.getItem("acessToken");
  if (auth) {
    return <Navigate to="/" />;
  }
  return props.children;
};

export default ProtectedLogin;
