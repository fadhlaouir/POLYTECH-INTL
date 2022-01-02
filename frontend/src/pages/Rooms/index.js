import { Table, Row, Col, Button, Modal, notification } from "antd";
import { useEffect } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import CreateRoom from "../../components/Rooms/CreateRoom";
import UpdateRoom from "../../components/Rooms/UpdateRoom";

import {
  deleteRoom,
  fetchAllRooms,
  selectAllRooms,
} from "../../reducers/Room.slice";

function Rooms() {
  const Rooms = useSelector(selectAllRooms);

  const { confirm } = Modal;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, []);

  const removeRoom = (data) => {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteRoom(data.id))
          .then(unwrapResult)
          .then(() => {
            notification.success({
              message: "Delete Room",
              description: "Room was Deleted successfully",
            });
            dispatch(fetchAllRooms());
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

  const room = Rooms?.map((b) => ({
    id: b.id,
    name: b.name,
    capacity: b.capacity,
    isAvailable: b.isAvailable ? "Available" : "Not Available",
  }));

  const ROOM_COLUMN = [
    {
      title: "Room Number",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Capacity",
      key: "capacity",
      dataIndex: "capacity",
    },
    {
      title: "Available ?",
      key: "isAvailable",
      dataIndex: "isAvailable",
    },
    {
      render: (record) => (
        <Row align="middle">
          <Col>
            <UpdateRoom record={record} />
          </Col>
          <Col style={{ marginLeft: "20px" }}>
            <Button type="primary" onClick={() => removeRoom(record)} danger>
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
      <CreateRoom />
      <Table columns={ROOM_COLUMN} dataSource={room} />
    </div>
  );
}

export default Rooms;
