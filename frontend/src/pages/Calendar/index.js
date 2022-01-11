/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useEffect } from "react";
import moment from "moment";

// Redux
import { useSelector, useDispatch } from "react-redux";

// UI Components
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";

// Style
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { fetchAllEvents, selectAllEvents } from "../../reducers/Event.slice";

const localizer = momentLocalizer(moment);

/* -------------------------------------------------------------------------- */
/*                                Calendar Page                               */
/* -------------------------------------------------------------------------- */
export default function Calendar() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const dispatch = useDispatch();

  const events = useSelector(selectAllEvents);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, []);

  /* -------------------------------- CONSTANTS ------------------------------- */
  const eventList = events?.map((s) => ({
    id: s.id,
    title: s.title,
    start: moment(s.start).toDate(),
    desc: s.desc,
    end: moment(s.end).toDate(),
    level: s.level?.name,
  }));

  return (
    <div className="calendar">
      <BigCalendar
        localizer={localizer}
        defaultView="week"
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
        max={new Date(2008, 0, 1, 21, 0)} // Max will be 6.00 PM!
        style={{ height: 700 }}
      />
    </div>
  );
}
