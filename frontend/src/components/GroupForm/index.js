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
import FormBuilder from "antd-form-builder";

// reducers
import { fetchAllUsers } from "../../reducers/User.slice";
import { fetchAllCourses } from "../../reducers/Course.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";

// styles
import "./index.css";
import {
  createGroup,
  fetchAllGroups,
  updateGroup,
} from "../../reducers/Group.slice";
import { fetchAlllevels } from "../../reducers/Level.slice";

/* -------------------------------------------------------------------------- */
/*                              Courses Component                             */
/* -------------------------------------------------------------------------- */
function GroupForm({ onlyFormItems, label, record }) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // Selectors
  const departments = useSelector(selectAllDepartments);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllCourses());
    dispatch(fetchAllDepartments());
    dispatch(fetchAlllevels());
    dispatch(fetchAllGroups());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
  const onClickSubmit = (entry) => {
    if (record) {
      dispatch(
        updateGroup({
          id: record.id,
          fields: {
            ...entry,
          },
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Update Group",
            description: "Group was Updated successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllGroups());
        })
        .catch(() =>
          notification.error({
            message: "Update Group",
            description: "An error occured",
          })
        );
    } else {
      dispatch(
        createGroup({
          ...entry,
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Create New Group",
            description: "Group was Created successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllGroups());
        })
        .catch(() =>
          notification.error({
            message: "Create New Group",
            description: "An error occured",
          })
        );
    }
  };

  /* -------------------------------- CONSTANTS ------------------------------- */
  const [form] = Form.useForm();

  // Get Level by selected departments
  const getDepartmentSelectedField = form.getFieldValue("department");
  const levelBySelectedDepartment = departments.find(
    (dep) => dep.id === getDepartmentSelectedField
  );

  const FormFields = [
    {
      key: "name",
      label: "Group Name",
      placeholder: "Group Name",
      initialValue: record?.name,
      rules: [
        {
          required: true,
          message: "Group Name is required",
        },
      ],
    },
    {
      key: "department",
      label: "departments",
      placeholder: "Select Department",
      widget: "select",
      initialValue: record?.department,
      options: departments?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "department is required",
        },
      ],
    },
    {
      key: "level",
      label: "level",
      placeholder: "Select level",
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
  ];
  // force update form
  const forceUpdate = FormBuilder.useForceUpdate();
  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(!showModal)}>
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
              <Button htmlType="submit" type="">
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}

GroupForm.propTypes = {
  record: PropTypes.object,
  label: PropTypes.string,
  onlyFormItems: PropTypes.bool,
};

export default GroupForm;
