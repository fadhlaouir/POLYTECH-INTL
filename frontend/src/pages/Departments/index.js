import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Table, Row, Col, Button, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  deleteCourse,
  fetchAllCourses,
  selectAllCourses,
} from "../../reducers/Course.slice";
import CreateCourse from "../../components/Courses/CreateCourse";
import UpdateCourse from "../../components/Courses/UpdateCourse";
import {
  deleteDepartment,
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";
import CreateDepartment from "../../components/Departments/CreateDepartment";
import UpdateDepartment from "../../components/Departments/UpdateDepartment";

function Departments() {
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const departments = useSelector(selectAllDepartments);

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  const removeDepartment = (data) => {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteDepartment(data.id))
          .then(unwrapResult)
          .then(() => {
            notification.success({
              message: "Delete Department",
              description: "Department was Deleted successfully",
            });
            dispatch(fetchAllDepartments());
          })
          .catch(() =>
            notification.error({
              message: "Delete Department",
              description: "An error occured",
            })
          );
      },
    });
  };

  const department = departments?.map((s) => ({
    id: s.id,
    name: s.name,
  }));

  const DEPARTMENTS_COLUMN = [
    {
      title: "Department",
      key: "name",
      dataIndex: "name",
    },
    {
      render: (record) => (
        <Row align="middle" justify="space-between">
          <Col>
            <UpdateDepartment record={record} />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => removeDepartment(record)}
              danger
            >
              Remove
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <h1>Departments</h1>
      <CreateDepartment />
      <Table columns={DEPARTMENTS_COLUMN} dataSource={department} />
    </div>
  );
}

export default Departments;
