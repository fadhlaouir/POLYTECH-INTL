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
import { Form, Button, Modal, notification } from "antd";
import { UsergroupAddOutlined, UserSwitchOutlined } from "@ant-design/icons";
import FormBuilder from "antd-form-builder";

// reducers
import { createUser, fetchAllUsers } from "../../reducers/User.slice";
import { fetchAllSpecialities } from "../../reducers/Speciality.slice";
import { fetchAlllevels } from "../../reducers/Level.slice";
import { fetchAllGroups, selectAllGroups } from "../../reducers/Group.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";
import { updateUser } from "../../reducers/User.slice";

/* -------------------------------------------------------------------------- */
/*                              Student Component                             */
/* -------------------------------------------------------------------------- */
function StudentForm({ onlyFormItems, isCreatedForm, label, record }) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Selectors
  const departments = useSelector(selectAllDepartments);
  const groups = useSelector(selectAllGroups);

  useEffect(() => {
    dispatch(fetchAllSpecialities());
    dispatch(fetchAllGroups());
    dispatch(fetchAlllevels());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllUsers());
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
            message: "Student",
            description: "Student has Updated successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllUsers());
        })
        .catch(() =>
          notification.error({
            message: "Student",
            description: "An error occured",
          })
        );
    } else {
      dispatch(
        createUser({
          ...entry,
          isStudent: true,
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Student",
            description: "Student was created successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllUsers());
        })
        .catch(() =>
          notification.error({
            message: "Student",
            description: "An error occured",
          })
        );
    }
  };
  /* -------------------------------- CONSTANTS ------------------------------- */
  const [form] = Form.useForm();
  /* -------------------------------------------------------------------------- */
  /*                                   HELPERS                                  */
  /* -------------------------------------------------------------------------- */
  // Get Level by selected departments
  const getDepartmentSelectedField = form.getFieldValue("department");
  const levelBySelectedDepartment = departments.find(
    (dep) => dep.id === getDepartmentSelectedField
  );

  // Get Group by selected levels
  const getLevelSelectedField = form.getFieldValue("level");
  const getGoupBySelectedLevelAndDepartment = groups.filter(
    (gr) =>
      gr.level?.id === getLevelSelectedField &&
      gr.department?.id === getDepartmentSelectedField
  );
  console.log("record", record);
  const FormFields = [
    {
      key: "code",
      label: "code",
      placeholder: "code",
      initialValue: record?.code,
      disabled: record ? true : false,
      rules: [
        {
          required: true,
          message: "Code is required",
        },
      ],
    },
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
      key: "department",
      label: "departments",
      placeholder: "departments",
      widget: "select",
      initialValue: record?.department,
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
      key: "level",
      label: "level",
      placeholder: "level",
      widget: "select",
      options: levelBySelectedDepartment?.levels.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "level is required",
        },
      ],
    },
    {
      key: "groupes",
      label: "Group",
      placeholder: "Group",
      widget: "select",
      options: getGoupBySelectedLevelAndDepartment?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "Group is required",
        },
      ],
    },
  ];

  // force update form
  const forceUpdate = FormBuilder.useForceUpdate();

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
          onValuesChange={forceUpdate}
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

StudentForm.propTypes = {
  record: PropTypes.object,
  label: PropTypes.string,
  isCreatedForm: PropTypes.bool,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

StudentForm.defaultProps = {
  isCreatedForm: false,
};

export default StudentForm;
