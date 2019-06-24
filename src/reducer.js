import { combineReducers } from "redux";
import homeReducer from "./components/home/homeReducer";
import wallReducer from "./components/wall/wallReducer";
import eventReducer from "./components/event/eventReducer";
import loginReducer from "./components/Login/loginReducer";

const reducer = combineReducers({
  homeReducer,
  wallReducer,
  eventReducer,
  loginReducer
});

export default reducer;
