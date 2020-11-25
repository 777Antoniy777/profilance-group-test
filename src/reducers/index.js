import {combineReducers} from "redux";
import user from "./user/user";
import popup from "./popup/popup";

export default combineReducers({
  user,
  popup,
});
