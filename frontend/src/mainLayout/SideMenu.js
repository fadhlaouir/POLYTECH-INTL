import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";

import "./TopBar.css";
import { useSelector } from "react-redux";
import { selectDepartments } from "../reducers/Speciality.slice";
import { selectAllDepartments } from "../reducers/Department.slice";

/* -------------------------------------------------------------------------- */
/*                                  Side Menu                                 */
/* -------------------------------------------------------------------------- */
function SideMenu() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { Sider } = Layout;
  const { SubMenu } = Menu;

  const departments = useSelector(selectAllDepartments);

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <Sider>
      <Menu defaultSelectedKeys={["0"]} mode="inline">
        <Menu.Item key="1">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/teatchers">All Teatchers</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/students">All Students</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/courses">Courses</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/rooms">Rooms</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/departments">Departments</Link>
        </Menu.Item>
        <SubMenu key="sub1" title="Filter By Department">
          {departments?.map((dp) => (
            <SubMenu key={dp.id} title={dp.name}>
              {dp.levels.map((level) => (
                <SubMenu key={Math.random()} title={level.name}>
                  <Menu.Item key={Math.random()}>
                    <Link
                      to={{
                        pathname: "/students",
                        level: level.name,
                        department: dp.name,
                      }}
                    >
                      Students
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={Math.random()}>
                    <Link
                      to={{
                        pathname: "/teatchers",
                        level: level.name,
                        department: dp.name,
                      }}
                    >
                      Teatchers
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ))}
            </SubMenu>
          ))}
        </SubMenu>
        <Menu.Item key="7">
          <Link to="/calendar">Calendar</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideMenu;
