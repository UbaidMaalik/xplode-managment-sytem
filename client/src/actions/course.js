import axios from "axios";
import {
  NEW_COURSE,
  COURSE_ERROR,
  GET_COURSES,
  SINGLE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
} from "../actions/constant";
import { setAlert } from "./alert";

export const newCourse = (course) => async (dispatch) => {
  try {
    const res = await axios.post("/courses/add", course);
    dispatch({
      type: NEW_COURSE,
      payload: res.data,
    });
    dispatch(setAlert("success", "Course added successfuly", 5000));
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
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

export const getCourses = () => async (dispatch) => {
  try {
    const res = await axios.get("/courses");

    dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Single Course
export const singleCourse = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/courses/${id}`);

    dispatch({
      type: SINGLE_COURSE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//Update Course
export const updateCourse = (id, data) => async (dispatch) => {
  try {
    const res = await axios.put(`/courses/${id}/update`, data);

    // dispatch({
    //   type: UPDATE_COURSE,
    //   payload: res.data,
    // });

    dispatch(getCourses());

    dispatch(setAlert("success", "Customer updated successfully", 5000));
  } catch (error) {
    return console.log(error);
    dispatch({
      type: COURSE_ERROR,
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
export const deleteCourse = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/courses/${id}/delete`);

    dispatch({
      type: DELETE_COURSE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
