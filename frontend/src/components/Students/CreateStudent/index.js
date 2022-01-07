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
} from "../../../reducers/User.slice";
import {
  fetchAllSpecialities,
  fetchDepartments,
  selectAllSpecialities,
  selectDepartments,
} from "../../../reducers/Speciality.slice";
import { Group } from "../../../common/constants";
import {
  fetchAlllevels,
  fetchLevels,
  selectAlllevels,
  selectLevels,
} from "../../../reducers/Level.slice";
import {
  fetchAllGroups,
  selectAllGroups,
  selectGroups,
} from "../../../reducers/Group.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../../reducers/Department.slice";

function CreateStudent({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const departments = useSelector(selectAllDepartments);
  const groups = useSelector(selectAllGroups);

  useEffect(() => {
    dispatch(fetchAllSpecialities());
    dispatch(fetchAllGroups());
    dispatch(fetchAlllevels());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllUsers());
  }, []);

  const onClickSubmit = (entry) => {
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
          description: "Created successfully",
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
  };

  const [form] = Form.useForm();

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

  const FormFields = [
    {
      key: "code",
      label: "code",
      placeholder: "code",
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
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setShowModal(!showModal)}
      >
        Create Student
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

CreateStudent.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default CreateStudent;
