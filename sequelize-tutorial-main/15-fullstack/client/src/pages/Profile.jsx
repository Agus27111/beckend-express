import React, { useEffect, useState } from "react";
import PerofileForm from "../components/PerofileForm";
import Menu from "../components/Menu";
import secureLocalStorage from "react-secure-storage";
import { setProfile } from "../actions/UserActions";
import { useAppState } from "../contexts/AppState";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [state, dispatch] = useAppState();
  const { updateProfileResult, updateProfileLoading, updateProfileError } =
    state;
  const user = secureLocalStorage.getItem("user");
  const [inputData, setInputData] = useState({
    userId: user.userId,
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProfile(dispatch, inputData);
  };
  useEffect(() => {
    if (updateProfileResult) {
      Swal.fire({
        title: "Success !",
        text: updateProfileResult.message,
        icon: "success",
      });
      navigate("/");
    }
    if (updateProfileError) {
      Swal.fire({
        title: "Gagal !",
        text: updateProfileError,
        icon: "error",
      });
    }
  }, [updateProfileResult, updateProfileError]);
  return (
    <div>
      <Menu />
      <PerofileForm
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
        updateProfileLoading={updateProfileLoading}
      />
    </div>
  );
}

export default Profile;
