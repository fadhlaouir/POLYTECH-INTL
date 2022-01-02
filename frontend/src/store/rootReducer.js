import { combineReducers } from "redux";

import Department from "../reducers/Department.slice";
import Group from "../reducers/Group.slice";
import Level from "../reducers/Level.slice";
import Room from "../reducers/Room.slice";
import Session from "../reducers/Session.slice";
import Speciality from "../reducers/Speciality.slice";
import Subject from "../reducers/Subject.slice";
import User from "../reducers/User.slice";

export default combineReducers({
    Department,
    Group,
    Level,
    Room,
    Session,
    Speciality,
    Subject,
    User,
});