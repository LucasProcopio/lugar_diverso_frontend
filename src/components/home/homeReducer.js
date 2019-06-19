import { FETCH_ABOUT, FETCH_CONTACT } from "./homeAction";

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
    default:
      return state;
  }
}
