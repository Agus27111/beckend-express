import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginUser } from "../features/userSlice";
import LoginForm from "../components/LoginForm";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";

function Login() {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoginUser(inputData));
  };

  useEffect(() => {
    if (data) {
      console.log(data.refreshToken);
      secureLocalStorage.setItem("acessToken", data.acessToken);
      secureLocalStorage.setItem("refreshToken", data.refreshToken);
      secureLocalStorage.setItem("user", data.data);
      navigate("/");
    }

    if (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      });
    }
  }, [data, error, navigate]);

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      inputData={inputData}
      setInputData={setInputData}
      setLoginUserLoading={loading}
    />
  );
}

export default Login;
