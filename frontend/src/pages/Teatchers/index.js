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

function Teatchers() {
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

  const teatcher = teatchers
    ?.filter((b) => b.isInstructor)
    .map((b) => ({
      id: b.id,
      userName: b.username,
      email: b.email,
      speciality: b.speciality,
    }));

  const TEATCHER_COLUMN = [
    {
      title: "Name",
      key: "userName",
      dataIndex: "userName",
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
      render: (record) => (
        <Row align="middle" justify="space-between">
          <Col>
            {console.log("record", record)}
            <UpdateTeatcher data={record} />
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

  console.log("teatchers", teatchers);
  return <Table columns={TEATCHER_COLUMN} dataSource={teatcher} />;
}

export default Teatchers;
