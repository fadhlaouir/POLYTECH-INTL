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
import UpdateTeatcher from "../../components/LandingPage/UpdateTeatchers";

function Students() {
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

  const student = Students?.filter((b) => b.isStudent).map((b) => ({
    id: b.id,
    username: b.username,
    email: b.email,
    code: b.code,
  }));

  const STUDENT_COLUMN = [
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
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      render: (record) => (
        <Row align="middle" justify="space-between">
          <Col>
            <UpdateTeatcher record={record} />
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

  return <Table columns={STUDENT_COLUMN} dataSource={student} />;
}

export default Students;
