import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../components/Home";
import Register from "../pages/Register";
import NoPage from "../components/NoPage";
import Logout from "../pages/Logout";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import secureLocalStorage from "react-secure-storage";
import jwt_decode from "jwt-decode";

function RoutePage() {
  // cek apakah refresh token expired
  let expRefresh = new Date();
  const refresh = secureLocalStorage.getItem("refreshToken");
  if (refresh) {
    expRefresh = new Date(jwt_decode(refresh).exp * 1000);
  }

  // ini bisa di simpan di dalam database
  // isLogin = manu mana saja yang muncul setelah login
  // isPrivate = hanya yang login yang bisa akses
  const nav = [
    { path: "/", element: <Home />, isPrivate: false, isLogin: true },
    { path: "/login", element: <Login />, isPrivate: false, isLogin: true },
    {
      path: "/about",
      element: <h1>About</h1>,
      isPrivate: false,
      isLogin: true,
    },
    {
      path: "/register",
      element: <Register />,
      isPrivate: false,
      isLogin: false,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      isPrivate: false,
      isLogin: false,
    },
    { path: "/contact", element: <Contact />, isPrivate: true, isLogin: true },
    { path: "/logout", element: <Logout />, isPrivate: true, isLogin: true },
    { path: "/profile", element: <Profile />, isPrivate: true, isLogin: true },
    { path: "*", element: <NoPage />, isPrivate: false, isLogin: true },
  ];
  const buildNav = () => {
    return nav.map((item, index) => {
      // cek apakah user sudah login
      const auth = secureLocalStorage.getItem("acessToken");
      // jika belum login dan tidak wajib  login maka munculkan menunya
      if (!auth && !item.isPrivate) {
        return <Route key={index} path={item.path} element={item.element} />;
        // jika sudah login
      } else if (auth) {
        // menu yang didapatkan ketika sudah login
        if (item.isLogin) {
          // jika refrsh token expire maka user harus login lagi untuk mendapat token baru
          if (expRefresh <= new Date()) {
            return <Route key={index} path={item.path} element={<Login />} />;
            // jika refrssh tidak expire munculkan menu seharusnya
          } else {
            return (
              <Route key={index} path={item.path} element={item.element} />
            );
          }
          // jika acess menu yang tidak didapatkan setelah login arahkan ke home saja
        } else {
          return <Route key={index} path={item.path} element={<Home />} />;
        }
      }
    });
  };
  return (
    <BrowserRouter>
      <Routes>{buildNav()}</Routes>
    </BrowserRouter>
  );
}

export default RoutePage;
