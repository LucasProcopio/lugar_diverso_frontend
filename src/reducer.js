import { combineReducers } from "redux";
import homeReducer from "./components/home/homeReducer";
import wallReducer from "./components/wall/wallReducer";

const reducer = combineReducers({
  homeReducer,
  wallReducer
});

export default reducer;
