import React from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Menu from "../components/Menu";
import Home from "../components/Home";
import Login from "./Login";

function Logout() {
  secureLocalStorage.removeItem("acessToken");
  secureLocalStorage.removeItem("refreshToken");
  secureLocalStorage.removeItem("user");
  // secureLocalStorage.clear();
  return (
    <>
      <Login />
    </>
  );
}

export default Logout;
