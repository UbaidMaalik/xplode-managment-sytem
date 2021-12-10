import axios from "axios";
import { AUTH_ERROR, LOGIN, SIGNUP, LOGOUT, LOAD_USER } from "./constant";

import { setToken } from "../utils/setToken";
import { setAlert } from "./alert";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const res = await axios.get("/login");
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register
export const register = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`/users/register`, user);

    dispatch({
      type: SIGNUP,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.map((err) => dispatch(setAlert("danger", err.msg)));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login
export const login = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`/login`, user);

    dispatch({
      type: LOGIN,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    const credentialsError = error.response.data.error;

    if (errors) {
      errors.map((valiationError) => {
        dispatch(setAlert("danger", valiationError.msg));
      });
    }

    if (credentialsError) {
      dispatch(setAlert("danger", credentialsError));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
