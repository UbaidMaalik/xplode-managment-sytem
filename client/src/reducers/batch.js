import {
  NEW_BATCH,
  GET_BATCHES,
  SINGLE_BATCH,
  UPDATE_BATCH,
  DELETE_BATCH,
  BATCH_ERROR,
} from "../actions/constant";

let initialState = {
  batches: [],
  batch: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_BATCH:
      return {
        ...state,
        batches: [payload, ...state.batches],
      };
    case GET_BATCHES:
      return {
        ...state,
        loading: false,
        batches: payload,
      };

    case BATCH_ERROR:
      return {
        ...state,
        error: payload,
      };
    case SINGLE_BATCH:
      return { ...state, loading: false, batch: payload };

    case UPDATE_BATCH:
      // find the index of the doc
      const index = state.batches.findIndex(
        (batch) => batch._id === payload._id
      );

      // remove the old one
      state.batches.splice(index, 1);

      return { ...state, loading: false, batches: state.batches };
    case DELETE_BATCH:
      return {
        ...state,
        batches: state.batches.filter((batch) => batch._id !== payload),
      };
    default:
      return state;
  }
}
