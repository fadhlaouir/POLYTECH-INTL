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
  selectAllUser,
} from "../../../reducers/User.slice";
import {
  createSubject,
  fetchAllSpecialities,
  fetchDepartments,
  selectAllSpecialities,
  selectDepartments,
} from "../../../reducers/Speciality.slice";
import { Group } from "../../../common/constants";
import {
  fetchLevels,
  selectGroups,
  selectLevels,
} from "../../../reducers/Level.slice";

function CreateCourse({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const users = useSelector(selectAllUser);
  const departments = useSelector(selectDepartments);
  const groups = useSelector(selectGroups);

  const teatchers = users.filter((us) => us.isInstructor);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchAllUsers());
  }, []);

  const onClickSubmit = (entry) => {
    dispatch(
      createSubject({
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
        dispatch(fetchAllUsers());
      })
      .catch(() =>
        notification.error({
          message: "Course",
          description: "An error occured",
        })
      );
  };

  const [form] = Form.useForm();

  // @TODOS: add user code checker
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
      rules: [
        {
          required: true,
          message: "Course Duration is required",
        },
      ],
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
