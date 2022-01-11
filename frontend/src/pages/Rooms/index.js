/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import { Table, Row, Col, Button, Modal, notification } from "antd";
import { useEffect } from "react";

// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// UI Components
import { ExclamationCircleOutlined } from "@ant-design/icons";

// Local Components
import RoomForm from "../../components/RoomForm";

// reducers
import {
  deleteRoom,
  fetchAllRooms,
  selectAllRooms,
} from "../../reducers/Room.slice";

/* -------------------------------------------------------------------------- */
/*                                  Room Page                                 */
/* -------------------------------------------------------------------------- */
function Rooms() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { confirm } = Modal;

  // Selectors
  const Rooms = useSelector(selectAllRooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
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
  /* -------------------------------- CONSTANTS ------------------------------- */
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
            <RoomForm label="Edit Room" record={record} />
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

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <h1>Rooms</h1>
      <RoomForm label="Create new Room" />
      <Table columns={ROOM_COLUMN} dataSource={room} />
    </div>
  );
}

export default Rooms;
