import { combineReducers } from "redux";
import auth from "../reducers/auth";
import alert from "./alert";
import course from "./course";
import batch from "./batch";
import student from "./student";
import expense from "./expense";

export default combineReducers({
  auth,
  alert,
  course,
  batch,
  student,
  expense,
});
