import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";
import { fetchAllUsers, selectAllUser } from "../../../reducers/User.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../../reducers/Department.slice";
import { createCourse, fetchAllCourses } from "../../../reducers/Course.slice";

function CreateCourse({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const users = useSelector(selectAllUser);
  const departments = useSelector(selectAllDepartments);

  const teatchers = users.filter((us) => us.isInstructor);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllCourses());
    dispatch(fetchAllDepartments());
  }, []);

  const onClickSubmit = (entry) => {
    dispatch(
      createCourse({
        ...entry,
      })
    )
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "Course",
          description: "Created successfully",
        });
        setShowModal(!showModal);
        dispatch(fetchAllCourses());
      })
      .catch(() =>
        notification.error({
          message: "Course",
          description: "An error occured",
        })
      );
  };

  const [form] = Form.useForm();

  const FormFields = [
    {
      key: "name",
      label: "Course Name",
      placeholder: "Course Name",
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
      widget: "select",
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
      placeholder: "Course Duration",
      widget: "number",
    },
    {
      key: "users",
      label: "Teatchers",
      placeholder: "Teatchers",
      widget: "select",
      options: teatchers?.map((item) => ({
        label: item.username,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "Teatchers is required",
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
        Create Course
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

CreateCourse.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default CreateCourse;
