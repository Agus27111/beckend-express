import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ForgotPasswordForm from "../components/ForgorPasswordForm";
import { useAppState } from "../contexts/AppState";
import { setForgotPassword } from "../actions/UserActions";

function ForgotPassword() {
  const [state, dispatch] = useAppState();
  const { forgotPasswordResult, forgotPasswordLoading, forgotPasswordError } =
    state;
  const [inputData, setInputData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setForgotPassword(dispatch, inputData);
  };

  useEffect(() => {
    if (forgotPasswordResult) {
      Swal.fire({
        title: "Success !",
        text: forgotPasswordResult.message,
        icon: "success",
      });
      navigate("/login");
    }
    if (forgotPasswordError) {
      Swal.fire({
        title: "Gagal !",
        text: forgotPasswordError,
        icon: "error",
      });
    }
  }, [forgotPasswordResult, forgotPasswordError]);

  return (
    <ForgotPasswordForm
      handleSubmit={handleSubmit}
      inputData={inputData}
      setInputData={setInputData}
      forgotPasswordLoading={forgotPasswordLoading}
    />
  );
}

export default ForgotPassword;
