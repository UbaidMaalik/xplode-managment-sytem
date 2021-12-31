import axios from "axios";
import {
  NEW_STUDENT,
  STUDENT_ERROR,
  GET_STUDENTS,
  SINGLE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  SET_LOADING,
  SET_BUTTON_LOADING,
} from "../actions/constant";
import { setAlert } from "./alert";

export const newStudent = (student) => async (dispatch) => {
  dispatch({
    type: SET_BUTTON_LOADING,
    payload: true,
  });
  try {
    const data = new FormData();

    data.append("image", student.image);
    data.append("name", student.name);
    data.append("father_name", student.father_name);
    data.append("phone_number", student.phone_number);
    data.append("home_phone", student.home_phone);
    data.append("gender", student.gender);
    data.append("nic", student.nic);
    data.append("address", student.address);
    data.append("d_o_b", student.d_o_b);
    data.append("batch", student.batch);
    data.append("email", student.email);
    Array.from(student.attachments).map((attachment) => {
      data.append("attachments", attachment);
    });
    data.append("admission_date", student.admission_date);
    data.append("heard_from", student.heard_from);
    data.append("reg_number", student.reg_number);

    await axios.post("/students/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: SET_BUTTON_LOADING,
      payload: false,
    });
    dispatch(setAlert("success", "Student added successfuly", 5000));
  } catch (error) {
    dispatch({
      type: SET_BUTTON_LOADING,
      payload: false,
    });
    if (
      error.response.status === 500 &&
      error.response.headers["content-type"] === "text/html; charset=utf-8"
    ) {
      dispatch(setAlert("warning", "Invalid files(s) selected!", 5000));
      // console.log(error.response);
    }
    dispatch({
      type: STUDENT_ERROR,
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

export const getStudents = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    const res = await axios.get(`/students/search/${keyword}`);

    dispatch({
      type: GET_STUDENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getStudentsByBatch = (selectedBatch) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    const res = await axios.get(`students/searchbybatch/${selectedBatch}`);

    dispatch({
      type: GET_STUDENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
// Single Student
export const singleStudent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/students/${id}`);

    dispatch({
      type: SINGLE_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//Update Student
export const updateStudent = (id, student) => async (dispatch) => {
  try {
    const data = new FormData();

    data.append("image", student.image);
    data.append("name", student.name);
    data.append("father_name", student.father_name);
    data.append("phone_number", student.phone_number);
    data.append("home_phone", student.home_phone);
    data.append("gender", student.gender);
    data.append("nic", student.nic);
    data.append("address", student.address);
    data.append("d_o_b", student.d_o_b);
    data.append("batch", student.batch);
    data.append("email", student.email);
    Array.from(student.attachments).map((attachment) => {
      data.append("attachments", attachment);
    });
    data.append("admission_date", student.admission_date);
    data.append("heard_from", student.heard_from);
    data.append("reg_number", student.reg_number);

    await axios.put(`/students/${id}/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setAlert("success", "Student updated successfully", 5000));
  } catch (error) {
    return console.log(error);
    if (
      error.response.status === 500 &&
      error.response.headers["content-type"] === "text/html; charset=utf-8"
    ) {
      dispatch(setAlert("warning", "Invalid files(s) selected!", 5000));
      // console.log(error.response);
    }
    dispatch({
      type: STUDENT_ERROR,
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
export const deleteStudent = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/students/${id}/delete`);

    dispatch({
      type: DELETE_STUDENT,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
