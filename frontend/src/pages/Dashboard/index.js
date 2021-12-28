import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, Row } from "antd";

import "./Dashboard.css";
import { fetchAllUsers, selectAllUser } from "../../reducers/User.slice";
function Dashboard() {
  const user = useSelector(selectAllUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div className="dashboard">
      <Row align="middle" justify="space-around">
        <Col>
          <Card title="Number of teatchers">
            <p>{user.filter((u) => u.isStudent).length}</p>
          </Card>
        </Col>
        <Col>
          <Card title="Number of Students">
            <p>{user.filter((u) => u.isInstructor).length}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
