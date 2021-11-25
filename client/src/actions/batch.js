import axios from "axios";
import {
  NEW_BATCH,
  GET_BATCHES,
  SINGLE_BATCH,
  UPDATE_BATCH,
  DELETE_BATCH,
  BATCH_ERROR,
} from "../actions/constant";
import { setAlert } from "./alert";

export const newBatch = (batch) => async (dispatch) => {
  try {
    const res = await axios.post("/batches/add", batch);

    dispatch({
      type: NEW_BATCH,
      payload: res.data,
    });

    dispatch(setAlert("success", "Batch added successfuly", 5000));
  } catch (error) {
    dispatch({
      type: BATCH_ERROR,
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

export const getBatches = () => async (dispatch) => {
  try {
    const res = await axios.get("/batches");

    dispatch({
      type: GET_BATCHES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Single Batch
export const singleBatch = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/batches/${id}`);

    dispatch({
      type: SINGLE_BATCH,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//Update Batch
export const updateBatch = (id, data) => async (dispatch) => {
  try {
    const res = await axios.put(`/batches/${id}/update`, data);

    // dispatch({
    //   type: UPDATE_COURSE,
    //   payload: res.data,
    // });

    dispatch(getBatches());

    dispatch(setAlert("success", "Customer updated successfully", 5000));
  } catch (error) {
    // return console.log(error);
    dispatch({
      type: BATCH_ERROR,
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
export const deleteBatch = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/batches/${id}/delete`);

    dispatch({
      type: DELETE_BATCH,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
