import { FETCH_EVENTS, DELETE_EVENT } from "./eventAction";

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
    default:
      return state;
  }
}
