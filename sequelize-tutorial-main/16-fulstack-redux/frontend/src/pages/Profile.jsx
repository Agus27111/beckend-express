import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { setProfile } from "../features/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import PerofileForm from "../components/PerofileForm";
import { useEffect, useState } from "react";

function Profile() {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
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
    dispatch(setProfile(inputData));
  };

  useEffect(() => {
    if (data) {
      // console.log(data);
      Swal.fire({
        title: "Success !",
        text: data.message,
        icon: "success",
      });
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
    <div>
      <Menu />
      <PerofileForm
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
        updateProfileLoading={loading}
      />
    </div>
  );
}

export default Profile;
