import {
  NEW_COURSE,
  GET_COURSES,
  SINGLE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  COURSE_ERROR,
} from "../actions/constant";

let initialState = {
  courses: [],
  course: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_COURSE:
      return {
        ...state,
        courses: [payload, ...state.courses],
      };

    case GET_COURSES:
      return {
        ...state,
        loading: false,
        courses: payload,
      };

    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
      };

    case SINGLE_COURSE:
      return { ...state, loading: false, course: payload };

    case UPDATE_COURSE:
      // find the index of the doc
      const index = state.courses.findIndex(
        (course) => course._id === payload._id
      );

      // remove the old one
      state.courses.splice(index, 1);

      return { ...state, loading: false, courses: state.courses };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload),
      };

    default:
      return state;
  }
}
