import { FETCH_EVENTS, DELETE_EVENT } from "./eventAction";
import { NETWORK_ERROR } from "../home/homeAction";

export default function eventReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        ...action.events
      };
    case DELETE_EVENT: {
      const filteredEvents = state.events.filter(event => {
        return event.id !== action.event;
      });
      return {
        ...state,
        events: [...filteredEvents]
      };
    }
    case NETWORK_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
