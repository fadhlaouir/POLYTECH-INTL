/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

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
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

// local Components
import DepartmentForm from "../../components/DepartmentForm";

// reducers
import {
  deleteDepartment,
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";

/* -------------------------------------------------------------------------- */
/*                              Departments Page                              */
/* -------------------------------------------------------------------------- */
function Departments() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const departments = useSelector(selectAllDepartments);

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} data data entry from form
   */
  const removeDepartment = (data) => {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteDepartment(data.id))
          .then(unwrapResult)
          .then(() => {
            notification.success({
              message: "Delete Department",
              description: "Department was Deleted successfully",
            });
            dispatch(fetchAllDepartments());
          })
          .catch(() =>
            notification.error({
              message: "Delete Department",
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
  const department = departments?.map((s) => ({
    id: s.id,
    levels: s.levels
      ?.map((le) => le.name)
      .sort()
      .join(" , "),
    name: s.name,
  }));

  const DEPARTMENTS_COLUMN = [
    {
      title: "Department",
      key: "name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Levels",
      key: "levels",
      dataIndex: "levels",
    },
    {
      render: (record) => (
        <Row align="middle" justify="space-around">
          <Col>
            <DepartmentForm label="Edit" record={record} />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => removeDepartment(record)}
              danger
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <h1>Departments</h1>
      <DepartmentForm label="Create new department" isCreatedForm />
      <Table columns={DEPARTMENTS_COLUMN} dataSource={department} />
    </div>
  );
}

export default Departments;
