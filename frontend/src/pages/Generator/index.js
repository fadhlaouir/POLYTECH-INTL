import React from "react";
import Timetable from "react-timetable-events";
import CreateSchedule from "../../components/Generator/CreateSchedule";

import "./index.css";

function Generator() {
  const IRM = {
    monday: [
      {
        id: 1,
        name: "DataBase",
        type: "custom",
        startTime: new Date("2022-01-07T08:30:00"),
        endTime: new Date("2022-01-07T10:00:00"),
      },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };
  return (
    <div className="generator">
      <h1>Generate Schedule</h1>
      <CreateSchedule />

      <Timetable
        events={IRM}
        hoursInterval={{
          from: 8,
          to: 18,
        }}
      />
    </div>
  );
}

export default Generator;
