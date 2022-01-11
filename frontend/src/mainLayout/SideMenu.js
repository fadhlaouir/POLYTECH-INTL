/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// UI Components
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  ScheduleOutlined,
  AlignLeftOutlined,
  SnippetsOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
} from "@ant-design/icons";

// Reducers
import { selectSessionUser } from "../reducers/Session.slice";

// Style
import "./TopBar.css";

/* -------------------------------------------------------------------------- */
/*                                  Side Menu                                 */
/* -------------------------------------------------------------------------- */
function SideMenu() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { Sider } = Layout;
  const user = useSelector(selectSessionUser);

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <Sider>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        style={{ height: "100vh" }}
      >
        <Menu.Item key="1">
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Menu.Item>
        {user.isAdmin && (
          <Menu.Item key="2">
            <Link to="/teatchers">
              <UserOutlined /> Instructors
            </Link>
          </Menu.Item>
        )}
        {user.isAdmin && (
          <Menu.Item key="3">
            <Link to="/students">
              <TeamOutlined /> Students
            </Link>
          </Menu.Item>
        )}

        {user.isAdmin && (
          <Menu.Item key="4">
            <Link to="/departments">
              <AlignLeftOutlined /> Departments
            </Link>
          </Menu.Item>
        )}
        {(user.isAdmin || user.isInstructor) && (
          <Menu.Item key="5">
            <Link to="/courses">
              <SnippetsOutlined /> Courses
            </Link>
          </Menu.Item>
        )}
        {user.isAdmin && (
          <Menu.Item key="6">
            <Link to="/groups">
              <MenuUnfoldOutlined /> Groups
            </Link>
          </Menu.Item>
        )}
        {user.isAdmin && (
          <Menu.Item key="7">
            <Link to="/rooms">
              <MenuUnfoldOutlined /> Rooms
            </Link>
          </Menu.Item>
        )}
        {user.isAdmin && (
          <Menu.Item key="8">
            <Link to="/generator">
              <SwapOutlined /> Generator
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="9">
          <Link to="/calendar">
            <ScheduleOutlined /> Calendar
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideMenu;
