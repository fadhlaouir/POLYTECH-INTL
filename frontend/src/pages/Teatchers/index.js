import { Table, Row, Col, Button, Modal, notification } from "antd";
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

function Teatchers({ location }) {
  const teatchers = useSelector(selectAllUser);
  const { confirm } = Modal;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
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

  const teatcher = location.department
    ? teatchers
        ?.filter(
          (b) =>
            b.isInstructor &&
            b.department.name === location.department &&
            b.level.name === location.level
        )
        .map((b) => ({
          id: b.id,
          username: b.username,
          speciality: b.speciality?.name,
          email: b.email,
          department: b.department?.name,
          cours: b.courses?.map((course) => course.name).join(", "),
          groupes: b.groupes?.map((course) => course.name).join(", "),
        }))
    : teatchers
        ?.filter((b) => b.isInstructor)
        .map((b) => ({
          id: b.id,
          username: b.username,
          email: b.email,
          speciality: b.speciality?.name,
          department: b.department?.name,
          cours: b.courses?.map((course) => course.name).join(", "),
          groupes: b.groupes?.map((group) => group.name).join(", "),
        }));

  const TEATCHER_COLUMN = [
    {
      title: "Name",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Speciality",
      key: "speciality",
      dataIndex: "speciality",
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
    },
    {
      title: "Courses",
      key: "cours",
      dataIndex: "cours",
    },
    {
      title: "Groupes",
      key: "groupes",
      dataIndex: "groupes",
    },
    {
      render: (record) => (
        <Row align="middle" justify="space-between">
          <Col>
            <UpdateTeatcher record={record} />
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
      <h1>
        Teatchers{" "}
        {location.department
          ? `Department: ${location.department} Level: ${location.level}`
          : ""}
      </h1>
      <CreateTeatcher />
      <Table columns={TEATCHER_COLUMN} dataSource={teatcher} />
    </div>
  );
}

export default Teatchers;
