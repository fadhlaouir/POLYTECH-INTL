import React from "react";
import { Card, Col, Row } from "antd";

import "./Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">
      <Row align="middle" justify="space-around">
        <Col>
          <Card title="Number of teatchers">
            <p>0</p>
          </Card>
        </Col>
        <Col>
          <Card title="Number of Students">
            <p>0</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
