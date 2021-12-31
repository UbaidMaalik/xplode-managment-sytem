import {
  NEW_EXPENSE,
  EXPENSE_ERROR,
  GET_EXPENSE,
  SINGLE_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
} from "../actions/constant";

let initialState = {
  expenses: [],
  expense: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_EXPENSE:
      return {
        ...state,
        expenses: [payload, ...state.expenses],
      };

    case GET_EXPENSE:
      return {
        ...state,
        loading: false,
        expenses: payload,
      };

    case EXPENSE_ERROR:
      return {
        ...state,
        error: payload,
      };

    case SINGLE_EXPENSE:
      return { ...state, loading: false, expense: payload };

    case UPDATE_EXPENSE:
      // find the index of the doc
      const index = state.expenses.findIndex(
        (expense) => expense._id === payload._id
      );

      // remove the old one
      state.expenses.splice(index, 1);

      return { ...state, loading: false, expenses: state.expenses };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense._id !== payload),
      };

    default:
      return state;
  }
}
