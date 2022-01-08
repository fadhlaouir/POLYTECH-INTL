import React from "react";

import CreateSchedule from "../../components/Generator/index";

import "./index.css";

function Generator() {
  return (
    <div className="generator">
      <h1>Generate Schedule</h1>
      <CreateSchedule />
    </div>
  );
}

export default Generator;
