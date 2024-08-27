import {
  REGISTER_USER,
  LOGIN_USER,
  FORGOT_PASSWORD,
  UPDATE_PROFILE,
} from "../../actions/UserActions";
const user = (state, action) => {
  const { type } = action;
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        setRegisterUserResult: action.payload.data,
        setRegisterUserLoading: action.payload.loading,
        setRegisterUserError: action.payload.errorMessage,
      };
    case LOGIN_USER:
      return {
        ...state,
        setLoginUserResult: action.payload.data,
        setLoginUserLoading: action.payload.loading,
        setLoginUserError: action.payload.errorMessage,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordResult: action.payload.data,
        forgotPasswordLoading: action.payload.loading,
        forgotPasswordError: action.payload.errorMessage,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        updateProfileResult: action.payload.data,
        updateProfileLoading: action.payload.loading,
        updateProfileError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default user;
