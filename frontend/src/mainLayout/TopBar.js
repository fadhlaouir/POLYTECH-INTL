/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// UI lib components
import { Row, Col, Layout, Divider, Typography, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { selectSessionUser, $logout } from "../reducers/Session.slice";

// Style
import "./TopBar.css";

/* -------------------------------------------------------------------------- */
/*                             Top Bar component                             */
/* -------------------------------------------------------------------------- */
function TopBar() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { Text } = Typography;
  const { Header } = Layout;

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectSessionUser);

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <Header id="top-bar">
      <Row align="middle" justify="space-between">
        <Col>
          <Link to="/">
            <img className="logo" src="/pi.png" alt="nextProtein logo" />
          </Link>
          <Divider type="vertical" />
        </Col>
        <Col>
          <Row align="middle" justify="space-around">
            <Col>
              {user && (
                <Row align="middle" justify="space-between">
                  <Text>{user.email}</Text>
                </Row>
              )}
            </Col>
            <Col>
              <Button
                className="logout-btn"
                icon={<LogoutOutlined />}
                onClick={() => {
                  dispatch($logout());
                  history.push("/");
                }}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}

export default TopBar;
