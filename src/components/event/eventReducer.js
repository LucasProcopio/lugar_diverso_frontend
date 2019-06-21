import { FETCH_EVENTS } from "./eventAction";

export default function eventReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        ...action.events
      };
    default:
      return state;
  }
}
