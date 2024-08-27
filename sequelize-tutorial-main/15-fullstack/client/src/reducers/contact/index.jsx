import {
  GET_KONTAK_LIST,
  ADD_KONTAK,
  DELETE_KONTAK,
  DETAIL_KONTAK,
  UPDATE_KONTAK,
} from "../../actions/ContactActions";
const kontak = (state, action) => {
  const { type } = action;
  switch (type) {
    case GET_KONTAK_LIST:
      return {
        ...state,
        getKontakResult: action.payload.data,
        getKontakLoading: action.payload.loading,
        getKontakError: action.payload.errorMessage,
      };
    case ADD_KONTAK:
      return {
        ...state,
        addKontakResult: action.payload.data,
        addKontakLoading: action.payload.loading,
        addKontakError: action.payload.errorMessage,
      };
    case DELETE_KONTAK:
      return {
        ...state,
        deleteKontakResult: action.payload.data,
        deleteKontakLoading: action.payload.loading,
        deleteKontakError: action.payload.errorMessage,
      };
    case DETAIL_KONTAK:
      return {
        ...state,
        detailKontakResult: action.payload.data,
      };
    case UPDATE_KONTAK:
      return {
        ...state,
        updateKontakResult: action.payload.data,
        updateKontakLoading: action.payload.loading,
        updateKontakError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default kontak;
