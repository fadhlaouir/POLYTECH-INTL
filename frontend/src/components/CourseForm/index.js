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
import { fetchAllUsers, selectAllUser } from "../../reducers/User.slice";
import {
  createCourse,
  fetchAllCourses,
  updateCourse,
} from "../../reducers/Course.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";

// styles
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                              Courses Component                             */
/* -------------------------------------------------------------------------- */
function CourseForm({ onChange, onlyFormItems, label, record }) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // Selectors
  const users = useSelector(selectAllUser);
  const departments = useSelector(selectAllDepartments);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllCourses());
    dispatch(fetchAllDepartments());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
  const onClickSubmit = (entry) => {
    if (record) {
      dispatch(
        updateCourse({
          id: record.id,
          fields: {
            ...entry,
          },
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Update Course",
            description: "Course was Updated successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllCourses());
        })
        .catch(() =>
          notification.error({
            message: "Update Course",
            description: "An error occured",
          })
        );
    } else {
      dispatch(
        createCourse({
          ...entry,
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Create New Course",
            description: "Course was Created successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllCourses());
        })
        .catch(() =>
          notification.error({
            message: "Create New Course",
            description: "An error occured",
          })
        );
    }
  };

  /* -------------------------------- CONSTANTS ------------------------------- */
  const [form] = Form.useForm();
  const teatchers = users.filter((us) => us.isInstructor);

  const FormFields = [
    {
      key: "name",
      label: "Course Name",
      placeholder: "Course Name",
      initialValue: record?.name,
      rules: [
        {
          required: true,
          message: "Course Name is required",
        },
      ],
    },
    {
      key: "departments",
      label: "Departments",
      placeholder: "Departments",
      widget: "checkbox-group",
      initialValue: record?.department,
      options: departments?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "Departments is required",
        },
      ],
    },
    {
      key: "duration",
      label: "Course Duration",
      initialValue: record?.duration,
      placeholder: "Course Duration",
      widget: "number",
    },
    {
      key: "users",
      label: "Teatchers",
      placeholder: "Teatchers",
      widget: "checkbox-group",
      options: teatchers?.map((item) => ({
        label: item.username,
        value: item.id,
      })),
    },
  ];

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
          onValuesChange={onChange}
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

CourseForm.propTypes = {
  record: PropTypes.object,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default CourseForm;
