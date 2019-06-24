import {
  FETCH_POEMS,
  FETCH_NOT_ACCEPTED,
  DELETE_POEM,
  ACCEPT_POEM
} from "./wallAction";

export default function wallReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_POEMS:
      return {
        ...state,
        ...action.poems
      };
    case FETCH_NOT_ACCEPTED:
      return {
        ...state,
        ...action.poems
      };
    case ACCEPT_POEM:
    case DELETE_POEM:
      const filteredPoems = state.results.filter(poem => {
        return poem.id !== action.poem;
      });
      return {
        ...state,
        results: [...filteredPoems]
      };
    default:
      return state;
  }
}
