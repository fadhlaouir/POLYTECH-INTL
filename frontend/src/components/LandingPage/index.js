// Packages
import React from "react";
import { Spin } from "antd";

import "./index.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Spin size={100} className="landing-page-spin" />
    </div>
  );
}

export default LandingPage;
