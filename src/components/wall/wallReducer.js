import { FETCH_POEMS } from "./wallAction";

export default function wallReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_POEMS:
      return {
        ...state,
        ...action.poems
      };
    default:
      return state;
  }
}
