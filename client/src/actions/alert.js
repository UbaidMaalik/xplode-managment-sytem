import { SET_ALERT, REMOVE_ALERT } from "./constant";
import { v4 } from "uuid";

export const setAlert = (type, message) => (dispatch) => {
  const id = v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      type,
      message,
      id,
    },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
