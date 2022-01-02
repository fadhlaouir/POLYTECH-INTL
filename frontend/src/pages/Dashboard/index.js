import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, Row } from "antd";

import "./Dashboard.css";
import { fetchAllUsers, selectAllUser } from "../../reducers/User.slice";
import {
  fetchDepartments,
  selectDepartments,
} from "../../reducers/Speciality.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";

function Dashboard() {
  const user = useSelector(selectAllUser);
  const departments = useSelector(selectAllDepartments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllDepartments());
  }, []);

  return (
    <div className="dashboard">
      <Row align="middle" justify="space-around">
        <Col>
          <Card title="Number of teatchers">
            <p>{user.filter((u) => u.isInstructor).length}</p>
          </Card>
        </Col>
        <Col>
          <Card title="Number of Students">
            <p>{user.filter((u) => u.isStudent).length}</p>
          </Card>
        </Col>
        <Col>
          <Card title="Number of Departments">
            <p>{departments?.length}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
