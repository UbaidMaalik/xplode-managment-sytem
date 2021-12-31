import axios from "axios";
import {
  NEW_EXPENSE,
  EXPENSE_ERROR,
  GET_EXPENSE,
  SINGLE_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
} from "../actions/constant";
import { setAlert } from "./alert";

export const newExpense = (expense) => async (dispatch) => {
  try {
    const res = await axios.post("/expense/add", expense);
    dispatch({
      type: NEW_EXPENSE,
      payload: res.data,
    });
    dispatch(setAlert("success", "Expense added successfuly", 5000));
  } catch (error) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    const validationErrors = error.response.data.errors;

    if (validationErrors) {
      validationErrors.forEach((validationError) =>
        dispatch(setAlert("error", validationError.msg))
      );
    }
  }
};

export const getExpenses = () => async (dispatch) => {
  try {
    const res = await axios.get("/expense");

    dispatch({
      type: GET_EXPENSE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Single Course
export const singleExpense = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/expense/${id}`);

    dispatch({
      type: SINGLE_EXPENSE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//Update Course
export const updateExpense = (id, data) => async (dispatch) => {
  try {
    const res = await axios.put(`/expense/${id}/update`, data);

    // dispatch({
    //   type: UPDATE_COURSE,
    //   payload: res.data,
    // });

    dispatch(getExpenses());

    dispatch(setAlert("success", "Expenses updated successfully", 5000));
  } catch (error) {
    return console.log(error);
    dispatch({
      type: EXPENSE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    const validationErrors = error.response.data.errors;

    if (validationErrors) {
      validationErrors.forEach((validationError) =>
        dispatch(setAlert("error", validationError.msg))
      );
    }
  }
};

//Delete
export const deleteExpense = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/expense/${id}/delete`);

    dispatch({
      type: DELETE_EXPENSE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
