import KontakReducer from "./contact/index";
import UserReducer from "./user/index";
const initialState = {
  getKontakResult: false,
  getKontakLoading: false,
  getKontakError: false,

  addKontakResult: false,
  addKontakLoading: false,
  addKontakError: false,

  deleteKontakResult: false,
  deleteKontakLoading: false,
  deleteKontakError: false,

  updateKontakResult: false,
  updateKontakLoading: false,
  updateKontakError: false,

  detailKontakResult: false,

  // user initial state
  setRegisterUserResult: false,
  setRegisterUserLoading: false,
  setRegisterUserError: false,

  setLoginUserResult: false,
  setLoginUserLoading: false,
  setLoginUserError: false,

  forgotPasswordResult: false,
  forgotPasswordLoading: false,
  forgotPasswordError: false,

  updateProfileResult: false,
  updateProfileLoading: false,
  updateProfileError: false,
};

const combineReducers = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: state[prop] }, action),
      };
    }, state);
  };
};

const appReducers = combineReducers({
  KontakReducer,
  UserReducer,
});

export { initialState, combineReducers, appReducers };
