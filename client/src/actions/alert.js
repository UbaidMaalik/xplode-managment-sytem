import { SET_ALERT, REMOVE_ALERT } from "./constant";

export const setAlert =
  (type, message, delay = 3000) =>
  (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        type,
        message,
      },
    });
    setTimeout(() => dispatch(removeAlert()), delay);
  };

export const removeAlert = () => (dispatch) =>
  dispatch({
    type: REMOVE_ALERT,
  });
