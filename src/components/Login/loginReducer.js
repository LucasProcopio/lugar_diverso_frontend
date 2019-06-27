import { FETCH_ADM_TOKEN, FETCH_ADM_DATA } from "./loginAction";

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ADM_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case FETCH_ADM_DATA:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}
