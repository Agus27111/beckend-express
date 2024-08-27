import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import RefreshToken from "./RefreshToken";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const setRegisterUser = async (dispatch, data) => {
  // loading
  dispatch({
    type: REGISTER_USER,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });

  axios({
    method: "post",
    url: "/api/users",
    timeout: 120000,
    data: data,
  })
    .then((response) => {
      dispatch({
        type: REGISTER_USER,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    })
    .catch((error) => {
      const dta = JSON.parse(error.request.response);
      dispatch({
        type: REGISTER_USER,
        payload: {
          loading: false,
          data: false,
          errorMessage: dta.errors[0] ? dta.errors[0] : error.message,
        },
      });
    });
};

export const setLoginUser = async (dispatch, data) => {
  // loading
  dispatch({
    type: LOGIN_USER,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });

  axios({
    method: "post",
    url: "/api/users/login",
    timeout: 120000,
    data: data,
  })
    .then((response) => {
      dispatch({
        type: LOGIN_USER,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    })
    .catch((error) => {
      const dta = JSON.parse(error.request.response);
      dispatch({
        type: LOGIN_USER,
        payload: {
          loading: false,
          data: false,
          errorMessage: dta.errors[0] ? dta.errors[0] : error.message,
        },
      });
    });
};

export const setForgotPassword = async (dispatch, data) => {
  // loading
  dispatch({
    type: FORGOT_PASSWORD,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });

  axios({
    method: "post",
    url: "/api/users/forgot-password",
    timeout: 120000,
    data: data,
  })
    .then((response) => {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    })
    .catch((error) => {
      const dta = JSON.parse(error.request.response);
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          loading: false,
          data: false,
          errorMessage: dta.errors[0] ? dta.errors[0] : error.message,
        },
      });
    });
};

export const setProfile = async (dispatch, data) => {
  // loading
  dispatch({
    type: UPDATE_PROFILE,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });
  const out = await RefreshToken(dispatch);
  const newData = {};
  newData.name = data.name;
  newData.email = data.email;
  if (data.password !== "") {
    newData.password = data.password;
    newData.confirmPassword = data.confirmPassword;
  }

  axios({
    method: "patch",
    url: "/api/users/" + data.userId,
    timeout: 120000,
    data: newData,
    headers: {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
    },
  })
    .then((response) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    })
    .catch((error) => {
      const dta = JSON.parse(error.request.response);
      dispatch({
        type: UPDATE_PROFILE,
        payload: {
          loading: false,
          data: false,
          errorMessage: dta.errors[0] ? dta.errors[0] : error.message,
        },
      });
    });
};
