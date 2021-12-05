import { combineReducers } from "redux";

import Session from "../reducers/Session.slice";
import User from "../reducers/User.slice";

export default combineReducers({
    Session,
    User,
});