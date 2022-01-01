import { Table, Row, Col, Button, Modal, notification, Tag } from "antd";
import { useEffect } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteUser,
  fetchAllUsers,
  selectAllUser,
} from "../../reducers/User.slice";
import UpdateTeatcher from "../../components/Teatchers/UpdateTeatchers";
import CreateTeatcher from "../../components/Teatchers/CreateTeatcher";
import {
  fetchAllSubjects,
  selectAllSubjects,
} from "../../reducers/Speciality.slice";
import CreateCourse from "../../components/Courses/CreateCourse";
import UpdateCourse from "../../components/Courses/UpdateCourse";

function Courses({ location }) {
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const subjects = useSelector(selectAllSubjects);

  useEffect(() => {
    dispatch(fetchAllSubjects());
  }, []);

  const removeTeatcher = (data) => {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteUser(data.id))
          .then(unwrapResult)
          .then(() => {
            notification.success({
              message: "Delete Instructor",
              description: "Instructor was Deleted successfully",
            });
            dispatch(fetchAllUsers());
          })
          .catch(() =>
            notification.error({
              message: "Delete Instructor",
              description: "An error occured",
            })
          );
      },
    });
  };

  const teatcher = subjects?.map((s) => ({
    id: s.id,
    name: s.name,
    department: s.departments.map((dp) => dp?.name).join(" , "),
    duration: s.duration,
    teatcher: s.users.filter((us) => us.isInstructor).map((us) => us.username),
    // availibilty: b.availibilty,
  }));
  console.log("subjects", subjects);
  const TEATCHER_COLUMN = [
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
      render: (record) => (
        <Row align="middle" justify="space-between">
          <Col>
            <UpdateCourse record={record} />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => removeTeatcher(record)}
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
      <CreateCourse />
      <Table columns={TEATCHER_COLUMN} dataSource={teatcher} />
    </div>
  );
}

export default Courses;
