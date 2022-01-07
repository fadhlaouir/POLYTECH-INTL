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
import { selectSessionUser } from "../../reducers/Session.slice";

function Courses() {
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const courses = useSelector(selectAllCourses);
  const user = useSelector(selectSessionUser);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  const removeCourse = (data) => {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteCourse(data.id))
          .then(unwrapResult)
          .then(() => {
            notification.success({
              message: "Delete Course",
              description: "Course was Deleted successfully",
            });
            dispatch(fetchAllCourses());
          })
          .catch(() =>
            notification.error({
              message: "Delete Course",
              description: "An error occured",
            })
          );
      },
    });
  };

  const teatcher = courses?.map((s) => ({
    id: s.id,
    name: s.name,
    department: s.departments.map((dp) => dp?.name).join(" , "),
    duration: s.duration,
    teatcher: s.users.filter((us) => us.isInstructor).map((us) => us.username),
    // availibilty: b.availibilty,
  }));

  const COURSE_COLUMN = [
    {
      title: "Course Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
    },
    {
      title: "Duration in hours",
      key: "duration",
      dataIndex: "duration",
    },
    {
      title: "Teatcher",
      key: "teatcher",
      dataIndex: "teatcher",
    },
    {
      render: (record) =>
        user.isAdmin && (
          <Row align="middle" justify="space-between">
            <Col>
              <UpdateCourse record={record} />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => removeCourse(record)}
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
      <h1>Courses</h1>
      {user.isAdmin && <CreateCourse />}
      <Table columns={COURSE_COLUMN} dataSource={teatcher} />
    </div>
  );
}

export default Courses;
