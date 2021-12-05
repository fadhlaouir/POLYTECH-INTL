import React from "react";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import { Form, Button, Layout, notification } from "antd";
import FormBuilder from "antd-form-builder";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { $login } from "../../reducers/Session.slice";

import "./LoginPage.css";

function LoginPage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginFormFields = [
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
  ];
  const onSubmit = (values) => {
    dispatch($login(values))
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "User Login",
          description: "User successfully logged in",
        });
        history.push("/");
        // dispatch(fetchSubjects());
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
    <Layout className="login-page-layout">
      <Layout.Content>
        <img className="logo" src="/pi.png" alt="PI logo" />
        <Form onFinish={onSubmit} form={form}>
          <FormBuilder form={form} meta={loginFormFields} />
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    </Layout>
  );
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginPage;
