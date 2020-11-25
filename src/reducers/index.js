import {combineReducers} from "redux";
import user from "./user/user";
import users from "./users/users";
import popup from "./popup/popup";
import news from "./news/news";

export default combineReducers({
  user,
  users,
  popup,
  news,
});
