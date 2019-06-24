import { FETCH_ABOUT, FETCH_CONTACT, NETWORK_ERROR } from "./homeAction";

export default function homeReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ABOUT:
      return {
        ...state,
        about: action.about
      };
    case FETCH_CONTACT:
      return {
        ...state,
        about: {
          ...state.about
        },
        contact: action.contact
      };
    case NETWORK_ERROR: {
      return {
        ...state,
        error: action.error
      };
    }
    default:
      return state;
  }
}
