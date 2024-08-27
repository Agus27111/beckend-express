import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginForm from "../components/LoginForm";
import { setLoginUser } from "../actions/UserActions";
import { useAppState } from "../contexts/AppState";
import secureLocalStorage from "react-secure-storage";

function Login() {
  const [state, dispatch] = useAppState();
  const { setLoginUserResult, setLoginUserLoading, setLoginUserError } = state;
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginUser(dispatch, inputData);
  };
  useEffect(() => {
    if (setLoginUserResult) {
      secureLocalStorage.setItem("acessToken", setLoginUserResult.acessToken);
      secureLocalStorage.setItem(
        "refreshToken",
        setLoginUserResult.refreshToken
      );
      secureLocalStorage.setItem("user", setLoginUserResult.data);
      navigate("/");
    }
    if (setLoginUserError) {
      Swal.fire({
        title: "Gagal !",
        text: setLoginUserError,
        icon: "error",
      });
    }
  }, [setLoginUserResult, setLoginUserError]);
  return (
    <LoginForm
      handleSubmit={handleSubmit}
      inputData={inputData}
      setInputData={setInputData}
      setLoginUserLoading={setLoginUserLoading}
    />
  );
}

export default Login;
