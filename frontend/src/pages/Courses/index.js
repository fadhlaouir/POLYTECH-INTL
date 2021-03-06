/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

// UI Components
import { Table, Row, Col, Button, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// local Components
import CourseForm from "../../components/CourseForm";

// reducers
import {
  deleteCourse,
  fetchAllCourses,
  selectAllCourses,
} from "../../reducers/Course.slice";
import { selectSessionUser } from "../../reducers/Session.slice";

// styles
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                Courses Page                                */
/* -------------------------------------------------------------------------- */
function Courses() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const courses = useSelector(selectAllCourses);
  const user = useSelector(selectSessionUser);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} data data entry from form
   */
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

  /* -------------------------------- CONSTANTS ------------------------------- */
  const teatcher = courses?.map((s) => ({
    id: s.id,
    name: s.name,
    department: s.departments.map((dp) => dp?.name).join(" , "),
    duration: s.duration,
    teatcher: s.users
      .filter((us) => us.isInstructor)
      .map((us) => us.username)
      .join(", "),
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
          <Row align="middle" justify="space-around">
            <Col>
              <CourseForm label="Edit" record={record} />
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
      {user.isAdmin && <CourseForm label="Create new course" />}
      <Table columns={COURSE_COLUMN} dataSource={teatcher} />
    </div>
  );
}

export default Courses;
