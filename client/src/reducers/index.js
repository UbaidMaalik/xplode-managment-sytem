import { combineReducers } from "redux";
import auth from "../reducers/auth";
import alert from "./alert";

export default combineReducers({
  auth,
  alert,
});
