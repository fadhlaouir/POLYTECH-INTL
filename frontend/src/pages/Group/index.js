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
import GroupForm from "../../components/GroupForm";

// reducers
import {
  deleteGroup,
  fetchAllGroups,
  selectAllGroups,
} from "../../reducers/Group.slice";
import { selectSessionUser } from "../../reducers/Session.slice";

/* -------------------------------------------------------------------------- */
/*                                 Group Page                                 */
/* -------------------------------------------------------------------------- */
function Group() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const groupes = useSelector(selectAllGroups);
  const user = useSelector(selectSessionUser);

  useEffect(() => {
    dispatch(fetchAllGroups());
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
        dispatch(deleteGroup(data.id))
          .then(unwrapResult)
          .then(() => {
            notification.success({
              message: "Delete Group",
              description: "Group was Deleted successfully",
            });
            dispatch(fetchAllGroups());
          })
          .catch(() =>
            notification.error({
              message: "Delete Group",
              description: "An error occured",
            })
          );
      },
    });
  };

  /* -------------------------------- CONSTANTS ------------------------------- */

  const groupList = groupes?.map((s) => ({
    id: s.id,
    name: s.name,
    department: s.department?.name,
    level: s.level?.name,
  }));

  const COURSE_COLUMN = [
    {
      title: "Group Name",
      key: "name",
      dataIndex: "name",
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
      render: (record) =>
        user.isAdmin && (
          <Row align="middle" justify="space-around">
            <Col>
              <GroupForm label="Edit Group" record={record} />
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
      <h1>Group List</h1>
      {user.isAdmin && <GroupForm label="Create new group" />}
      <Table columns={COURSE_COLUMN} dataSource={groupList} />
    </div>
  );
}

export default Group;
