import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RegisterForm from "../components/RegisterForm";
import { useAppState } from "../contexts/AppState";
import { setRegisterUser } from "../actions/UserActions";

function Register() {
  const [state, dispatch] = useAppState();
  const {
    setRegisterUserResult,
    setRegisterUserLoading,
    setRegisterUserError,
  } = state;
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterUser(dispatch, inputData);
  };
  useEffect(() => {
    if (setRegisterUserResult) {
      Swal.fire({
        title: "Success !",
        text: setRegisterUserResult.message,
        icon: "success",
      });
      navigate("/login");
    }
    if (setRegisterUserError) {
      Swal.fire({
        title: "Gagal !",
        text: setRegisterUserError,
        icon: "error",
      });
    }
  }, [setRegisterUserResult, setRegisterUserError]);
  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      inputData={inputData}
      setInputData={setInputData}
      setRegisterUserLoading={setRegisterUserLoading}
    />
  );
}

export default Register;
