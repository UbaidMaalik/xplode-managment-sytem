import {
  NEW_STUDENT,
  GET_STUDENTS,
  SINGLE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  STUDENT_ERROR,
  SET_LOADING,
  SET_BUTTON_LOADING,
} from "../actions/constant";

let initialState = {
  students: [],
  student: null,
  loading: true,
  searchLoading: false,
  btnLoading: false,
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
        searchLoading: false,
        students: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        searchLoading: payload,
      };
    case SET_BUTTON_LOADING:
      return {
        ...state,
        btnLoading: payload,
      };
    case SINGLE_STUDENT:
      return { ...state, loading: false, student: payload };
    case UPDATE_STUDENT:
      // find the index of the doc
      const index = state.students.findIndex(
        (student) => student._id === payload._id
      );

      return { ...state, loading: false, students: state.students };

    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((student) => student._id !== payload),
      };
    default:
      return state;
  }
}
