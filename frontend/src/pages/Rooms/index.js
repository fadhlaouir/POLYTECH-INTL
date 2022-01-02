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

function Rooms({ location }) {
  const Rooms = useSelector(selectAllUser);
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
              message: "Delete Room",
              description: "Room was Deleted successfully",
            });
            dispatch(fetchAllUsers());
          })
          .catch(() =>
            notification.error({
              message: "Delete Room",
              description: "An error occured",
            })
          );
      },
    });
  };

  const teatcher = location.department
    ? Rooms?.filter(
        (b) =>
          b.isInstructor &&
          b.department.name === location.department &&
          b.level.name === location.level
      ).map((b) => ({
        id: b.id,
        username: b.username,
        speciality: b.speciality?.name,
        email: b.email,
        department: b.department?.name,
        availibilty: b.availibilty,
      }))
    : Rooms?.filter((b) => b.isInstructor).map((b) => ({
        id: b.id,
        username: b.username,
        email: b.email,
        speciality: b.speciality?.name,
        department: b.department?.name,
        availibilty: b.availibilty,
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
      title: "Availibilty",
      key: "availibilty",
      dataIndex: "availibilty",
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
      <h1>Rooms</h1>
      <CreateTeatcher />
      <Table columns={TEATCHER_COLUMN} dataSource={teatcher} />
    </div>
  );
}

export default Rooms;
