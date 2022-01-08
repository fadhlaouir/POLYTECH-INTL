/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */
// Packages
import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "moment-timezone";
import axios from "axios";

// redux
import { useDispatch } from "react-redux";

// UI Components
import { Layout, notification } from "antd";

// Local components
import TopBar from "./mainLayout/TopBar";
import SideMenu from "./mainLayout/SideMenu";
import { $logout } from "./reducers/Session.slice";

// Style config
import "./App.css";

/* -------------------------------------------------------------------------- */
/*                                     APP                                    */
/* -------------------------------------------------------------------------- */
function App({ children }) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { Footer, Content } = Layout;
  const dispatch = useDispatch();
  const history = useHistory();

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  // Handle expired tokens wherever they arise
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error && error.response && error.response.status === 401) {
        dispatch($logout());
        history.push("/dashboard");
        notification.error({
          message: "Expired Session",
          placement: "topRight",
        });
      } else if (error) {
        notification.error({
          message: `unknown Error : ${error}`,
          placement: "topRight",
        });
      }
      return error;
    }
  );
  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div id="app">
      <Layout className="main-layout">
        <TopBar />
        <Layout>
          <SideMenu />
          <Content className="main-layout-content">{children}</Content>
        </Layout>
        <Footer />
      </Layout>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
