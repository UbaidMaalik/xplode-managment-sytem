import {
  AUTH_ERROR,
  LOGIN,
  SIGNUP,
  LOGOUT,
  LOAD_USER,
} from "../actions/constant";

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
  token: localStorage.getItem("token"),
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };

    case LOGIN:
    case SIGNUP:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
