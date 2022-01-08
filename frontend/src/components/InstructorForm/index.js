/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

// UI Components
import { Form, Button, Modal, notification, Select } from "antd";
import { UsergroupAddOutlined, UserSwitchOutlined } from "@ant-design/icons";
import FormBuilder from "antd-form-builder";

// reducers
import { fetchAllGroups, selectAllGroups } from "../../reducers/Group.slice";
import { fetchAllCourses, selectAllCourses } from "../../reducers/Course.slice";
import {
  fetchAllSpecialities,
  selectAllSpecialities,
} from "../../reducers/Speciality.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";
import {
  updateUser,
  createUser,
  fetchAllUsers,
} from "../../reducers/User.slice";

/* -------------------------------------------------------------------------- */
/*                               Instructor Form                              */
/* -------------------------------------------------------------------------- */
function InstructorForm({
  onChange,
  onlyFormItems,
  isCreatedForm,
  label,
  record,
}) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { Option } = Select;
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // Selectors
  const specialities = useSelector(selectAllSpecialities);
  const departments = useSelector(selectAllDepartments);
  const groups = useSelector(selectAllGroups);
  const courses = useSelector(selectAllCourses);

  useEffect(() => {
    dispatch(fetchAllSpecialities());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllUsers());
    dispatch(fetchAllGroups());
    dispatch(fetchAllCourses());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
  const onClickSubmit = (entry) => {
    if (record) {
      dispatch(
        updateUser({
          id: record.id,
          fields: {
            ...entry,
          },
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Instructor",
            description: "Instructor Updated successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllUsers());
        })
        .catch(() =>
          notification.error({
            message: "Instructor",
            description: "An error occured",
          })
        );
    } else {
      dispatch(
        createUser({
          ...entry,
          isInstructor: true,
          isAvailable: true,
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Instructor",
            description: "Instructor was created successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllUsers());
        })
        .catch(() =>
          notification.error({
            message: "Instructor",
            description: "An error occured",
          })
        );
    }
  };

  /* -------------------------------- CONSTANTS ------------------------------- */
  const [form] = Form.useForm();

  const FormFields = [
    {
      key: "username",
      label: "username",
      placeholder: "username",
      initialValue: record?.username,
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
      initialValue: record?.email,
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
      onChange: () => {
        if (form.isFieldTouched("confirmPassword")) {
          form.validateFields(["confirmPassword"]);
        }
      },
      rules: [
        {
          required: true,
          message: "Password is required",
        },
      ],
    },
    {
      key: "confirmPassword",
      label: "Confirm Passowrd",
      widget: "password",
      required: true,
      rules: [
        {
          validator: (rule, value, callback) => {
            return new Promise((resolve, reject) => {
              if (value !== form.getFieldValue("password")) {
                reject(new Error("Two passwords are inconsistent."));
              } else {
                resolve();
              }
            });
          },
        },
      ],
    },
    {
      key: "speciality",
      label: "Specialities",
      placeholder: "Specialities",
      initialValue: record?.speciality,
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
      initialValue: record?.department,
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
    {
      key: "groupes",
      label: "groupes",
      placeholder: "groupes",
      initialValue: record?.groupes,
      widget: "checkbox-group",
      options: groups?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "groupes is required",
        },
      ],
    },
    {
      key: "courses",
      label: "courses",
      placeholder: "courses",

      initialValue: record?.courses,
      widget: "select",
      options: courses?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "courses is required",
        },
      ],
    },
    {
      key: "isAvailable",
      label: "isAvailable",
      placeholder: "isAvailable",
      widget: "switch",
      initialValue: record?.isAvailable,
      rules: [
        {
          required: true,
          message: "isAvailable is required",
        },
      ],
    },
  ];

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(!showModal)}>
        {isCreatedForm ? <UsergroupAddOutlined /> : <UserSwitchOutlined />}
        {label}
      </Button>
      <Modal
        style={{ minHeight: "1500px !important" }}
        title={label}
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

InstructorForm.propTypes = {
  record: PropTypes.object,
  label: PropTypes.string,
  isCreatedForm: PropTypes.bool,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

InstructorForm.defaultProps = {
  isCreatedForm: false,
};

export default InstructorForm;
