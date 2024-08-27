import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import RefreshToken from "./RefreshToken";

export const GET_KONTAK_LIST = "GET_KONTAK_LIST";
export const ADD_KONTAK = "ADD_KONTAK";
export const DELETE_KONTAK = "DELETE_KONTAK";
export const DETAIL_KONTAK = "DETAIL_KONTAK";
export const UPDATE_KONTAK = "UPDATE_KONTAK";
export const getKontakList = async (dispatch) => {
  // loading
  dispatch({
    type: GET_KONTAK_LIST,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });

  const out = await RefreshToken(dispatch);

  axios({
    method: "get",
    url: "/api/contacts",
    timeout: 120000,
    headers: {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
    },
  })
    .then((response) => {
      dispatch({
        type: GET_KONTAK_LIST,
        payload: {
          loading: false,
          data: response.data.data,
          errorMessage: false,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_KONTAK_LIST,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    });
};

export const addKontak = async (dispatch, data) => {
  // loading
  dispatch({
    type: ADD_KONTAK,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });

  const out = await RefreshToken(dispatch);

  axios({
    method: "post",
    url: "/api/contacts",
    timeout: 120000,
    data: data,
    headers: {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
    },
  })
    .then((response) => {
      dispatch({
        type: ADD_KONTAK,
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
        type: ADD_KONTAK,
        payload: {
          loading: false,
          data: false,
          errorMessage: dta.errors[0] ? dta.errors[0] : error.message,
        },
      });
    });
};
export const deleteKontak = async (dispatch, id) => {
  // loading
  dispatch({
    type: DELETE_KONTAK,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });

  const out = await RefreshToken(dispatch);

  axios({
    method: "delete",
    url: "/api/contacts/" + id,
    timeout: 120000,
    headers: {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
    },
  })
    .then((response) => {
      dispatch({
        type: ADD_KONTAK,
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
        type: ADD_KONTAK,
        payload: {
          loading: false,
          data: false,
          errorMessage: dta.errors[0] ? dta.errors[0] : error.message,
        },
      });
    });
};
export const detailKontak = (dispatch, data) => {
  // loading
  dispatch({
    type: DETAIL_KONTAK,
    payload: {
      data: data,
    },
  });
};

export const updateKontak = async (dispatch, data) => {
  console.log("2. masuk action update klik");
  // loading
  dispatch({
    type: UPDATE_KONTAK,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });

  const out = await RefreshToken(dispatch);

  axios({
    method: "put",
    url: "/api/contacts/" + data.contactId,
    timeout: 120000,
    data: data,
    headers: {
      Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
    },
  })
    .then((response) => {
      dispatch({
        type: UPDATE_KONTAK,
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
        type: UPDATE_KONTAK,
        payload: {
          loading: false,
          data: false,
          errorMessage: dta.errors[0] ? dta.errors[0] : error.message,
        },
      });
    });
};
