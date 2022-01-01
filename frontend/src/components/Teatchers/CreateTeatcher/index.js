import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";

import {
  createUser,
  fetchAllUsers,
  fetchUser,
  updateUSer,
} from "../../../reducers/User.slice";
import {
  fetchAllSpecialities,
  fetchDepartments,
  selectAllSpecialities,
  selectDepartments,
} from "../../../reducers/Speciality.slice";

function CreateTeatcher({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const specialities = useSelector(selectAllSpecialities);
  const departments = useSelector(selectDepartments);
  console.log("departments", departments);
  useEffect(() => {
    dispatch(fetchAllSpecialities());
    dispatch(fetchDepartments());
    dispatch(fetchAllUsers());
  }, []);

  const onClickSubmit = (entry) => {
    dispatch(
      createUser({
        ...entry,
        isInstructor: true,
      })
    )
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "Instructor",
          description: "Created successfully",
        });
        setShowModal(!showModal);
        dispatch(fetchUser(record.id));
      })
      .catch(() =>
        notification.error({
          message: "Instructor",
          description: "An error occured",
        })
      );
  };
  const [form] = Form.useForm();

  // @TODOS: add user code checker
  const FormFields = [
    {
      key: "username",
      label: "username",
      placeholder: "username",
      rules: [
        {
          required: true,
          message: "username is required",
        },
      ],
    },
    {
      key: "email",
      label: "Email",
      placeholder: "email",
      rules: [
        {
          required: true,
          message: "email is required",
        },
      ],
    },
    {
      key: "password",
      label: "Password",
      widget: "password",

      rules: [
        // This is equivalent with "required: true"
        {
          required: true,
          message: "Password is required",
        },
      ],
    },
    {
      key: "speciality",
      label: "Specialities",
      placeholder: "Specialities",
      widget: "select",
      options: specialities?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "Specialities is required",
        },
      ],
    },
    {
      key: "department",
      label: "departments",
      placeholder: "departments",
      widget: "select",
      options: departments?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "departments is required",
        },
      ],
    },
  ];

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setShowModal(!showModal)}
      >
        Create Teatcher
      </Button>
      <Modal
        style={{ minHeight: "1500px !important" }}
        title="Create"
        width={1000}
        visible={showModal}
        maskClosable={false}
        footer={null}
        closable
        destroyOnClose
        onCancel={() => setShowModal(!showModal)}
      >
        <Form
          layout="horizontal"
          onFinish={(values) => onClickSubmit(values)}
          onValuesChange={onChange}
          form={form}
        >
          <FormBuilder form={form} meta={FormFields} />
          {!onlyFormItems && (
            <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}

CreateTeatcher.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default CreateTeatcher;
