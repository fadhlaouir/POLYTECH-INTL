import { Table, Tag, Space, Row, Col, Button, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import {
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteUser,
  fetchAllUsers,
  selectAllUser,
} from "../../reducers/User.slice";
import UpdateStudents from "../../components/Students/UpdateStudents";
import CreateStudent from "../../components/Students/CreateStudent";

function Students({ location }) {
  const Students = useSelector(selectAllUser);
  const { confirm } = Modal;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const removeStudent = (data) => {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteUser(data.id))
          .then(unwrapResult)
          .then(() => {
            notification.success({
              message: "Delete Student",
              description: "Student was Deleted successfully",
            });
            dispatch(fetchAllUsers());
          })
          .catch(() =>
            notification.error({
              message: "Delete Student",
              description: "An error occured",
            })
          );
      },
    });
  };

  // check if we have the props or not
  const student = location.department
    ? Students?.filter(
        (b) =>
          b.isStudent &&
          b.department.name === location.department &&
          b.level.name === location.level
      ).map((b) => ({
        id: b.id,
        code: b.code,
        username: b.username,
        email: b.email,
        department: b.department.name,
        level: b.level.name,
        group: b.groupe?.name,
      }))
    : Students?.filter((b) => b.isStudent).map((b) => ({
        id: b.id,
        code: b.code,
        username: b.username,
        email: b.email,
        department: b.department.name,
        level: b.level.name,
        group: b.groupe?.name,
      }));

  const STUDENT_COLUMN = [
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
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
      title: "Department",
      key: "department",
      dataIndex: "department",
    },
    {
      title: "Level",
      key: "level",
      dataIndex: "level",
    },
    {
      title: "Group",
      key: "group",
      dataIndex: "group",
    },
    {
      render: (record) => (
        <Row align="middle" justify="space-between">
          <Col>
            <UpdateStudents record={record} />
          </Col>
          <Col>
            <Button type="primary" onClick={() => removeStudent(record)} danger>
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
        Students{" "}
        {location.department
          ? `Department: ${location.department} Level: ${location.level}`
          : ""}
      </h1>
      <CreateStudent />
      <Table columns={STUDENT_COLUMN} dataSource={student} />;
    </div>
  );
}

export default Students;
