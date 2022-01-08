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
import Highlighter from "react-highlight-words";

// reducers
import {
  deleteUser,
  fetchAllUsers,
  selectAllUser,
} from "../../reducers/User.slice";

// Local Components
import InstructorForm from "../../components/InstructorForm";

/* -------------------------------------------------------------------------- */
/*                               Instructor Page                              */
/* -------------------------------------------------------------------------- */
function Teatchers() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { confirm } = Modal;
  // Selectors
  const teatchers = useSelector(selectAllUser);

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
  /* -------------------------------- CONSTANTS ------------------------------- */
  const teatcher = teatchers
    ?.filter((b) => b.isInstructor)
    .map((b) => ({
      id: b.id,
      username: b.username,
      email: b.email,
      speciality: b.speciality?.name,
      department: b.department?.name,
      cours: b.courses?.map((course) => course.name).join(", "),
      groupes: b.groupes?.map((group) => group.name).join(", "),
      isAvailable: b.isAvailable ? "Available" : "Not Available",
    }));

  const TEATCHER_COLUMN = [
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
      title: "Available ?",
      key: "isAvailable",
      dataIndex: "isAvailable",
    },
    {
      render: (record) => (
        <Row align="middle" justify="space-around">
          <Col>
            <InstructorForm label="Edit" record={record} />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => removeTeatcher(record)}
              danger
            >
              <UserDeleteOutlined /> Remove
            </Button>
          </Col>
        </Row>
      ),
    },
  ];
  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <h1>Instructors List</h1>
      <InstructorForm label="Create new Instructor" isCreatedForm />

      <Table columns={TEATCHER_COLUMN} dataSource={teatcher} />
    </div>
  );
}

export default Teatchers;
