/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useEffect, useState } from "react";

// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// UI Components
import {
  Table,
  Row,
  Col,
  Button,
  Modal,
  notification,
  Input,
  Space,
} from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { UserDeleteOutlined } from "@ant-design/icons";

// reducers
import {
  deleteUser,
  fetchAllUsers,
  selectAllUser,
} from "../../reducers/User.slice";

// Local Components
import StudentForm from "../../components/StudentForm";
import Highlighter from "react-highlight-words";

/* -------------------------------------------------------------------------- */
/*                                Student Page                                */
/* -------------------------------------------------------------------------- */
function Students() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { confirm } = Modal;
  // Selectors
  const Students = useSelector(selectAllUser);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // check if we have the props or not
  const student = Students?.filter((b) => b.isStudent).map((b) => ({
    id: b.id,
    code: b.code,
    username: b.username,
    email: b.email,
    department: b.department.name,
    level: b.level.name,
    group: b.groupes?.map((gr) => gr.name),
  }));

  const STUDENT_COLUMN = [
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      ...getColumnSearchProps("code"),
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      key: "username",
      dataIndex: "username",
      ...getColumnSearchProps("username"),
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ["descend"],
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
        <Row align="middle" justify="space-around">
          <Col>
            <StudentForm label="Edit" record={record} />
          </Col>
          <Col>
            <Button type="primary" onClick={() => removeStudent(record)} danger>
              <UserDeleteOutlined /> Remove
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <h1>Students List</h1>
      <StudentForm label="Create new Student" isCreatedForm />
      <Table columns={STUDENT_COLUMN} dataSource={student} />
    </div>
  );
}

export default Students;
