import { combineReducers } from "redux";

import Session from "../reducers/Session.slice";
import User from "../reducers/User.slice";
import Speciality from "../reducers/Speciality.slice";
import Level from "../reducers/Level.slice";

export default combineReducers({
    Session,
    User,
    Speciality,
    Level,
});