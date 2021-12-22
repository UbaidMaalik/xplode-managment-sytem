import {
  NEW_STUDENT,
  GET_STUDENTS,
  SINGLE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  STUDENT_ERROR,
} from "../actions/constant";

let initialState = {
  students: [],
  stufent: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_STUDENT:
      return {
        ...state,
        students: [payload, ...state.students],
      };

    case GET_STUDENTS:
      return {
        ...state,
        loading: false,
        students: payload,
      };
    default:
      return state;
  }
}
