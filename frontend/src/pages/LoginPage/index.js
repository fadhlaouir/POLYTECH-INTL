import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import { Form, Button, Layout, notification, Row, Col } from "antd";
import FormBuilder from "antd-form-builder";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { $login } from "../../reducers/Session.slice";

import "./LoginPage.css";

function LoginPage() {
  const [form] = Form.useForm();
  const [columns] = useState(2);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginFormFields = {
    columns,
    fields: [
      {
        key: "identifier",
        label: "Email",
        placeholder: "Email",

        rules: [
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ],
      },
      {
        key: "password",
        label: "Password",
        placeholder: "Password",
        widget: "password",
        rules: [
          {
            required: true,
            message: "Please input your password!",
          },
        ],
      },
    ],
  };
  const onSubmit = (values) => {
    dispatch($login(values))
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "User Login",
          description: "User successfully logged in",
        });
        history.push("/dashboard");
      })
      .catch(() =>
        notification.error({
          message: "User Login",
          description: "An error occured",
        })
      );
  };
  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <Layout>
      <Layout.Content>
        <Row align="middle" justify="center">
          <Col xs={6} xl={12}>
            <img
              className="polytech"
              src="https://pi.tn/wp-content/uploads/2020/03/H.RGAYEG-707-1_d8e3d978a029e906a943f44da817876a.jpg?id=20390"
              alt="PI logo"
            />
          </Col>
          <Col xs={6} xl={12}>
            <Form onFinish={onSubmit} form={form} className="login-page-layout">
              <FormBuilder form={form} meta={loginFormFields} />
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="login-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginPage;
