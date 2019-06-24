import { FETCH_ADM_TOKEN } from "./loginAction";

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ADM_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
}
