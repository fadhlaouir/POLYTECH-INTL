import { combineReducers } from "redux";

import Department from "../reducers/Department.slice";
import Group from "../reducers/Group.slice";
import Level from "../reducers/Level.slice";
import Room from "../reducers/Room.slice";
import Session from "../reducers/Session.slice";
import Speciality from "../reducers/Speciality.slice";
import Course from "../reducers/Course.slice";
import User from "../reducers/User.slice";
import Event from "../reducers/Event.slice";

export default combineReducers({
    Department,
    Group,
    Level,
    Room,
    Session,
    Speciality,
    Course,
    User,
    Event,
});