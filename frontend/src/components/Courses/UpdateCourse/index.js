import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification, Row, Col, Select } from "antd";
import FormBuilder from "antd-form-builder";

import {
  fetchAllUsers,
  fetchUser,
  selectAllUser,
  updateUSer,
} from "../../../reducers/User.slice";
import {
  createSubject,
  fetchAllSpecialities,
  fetchDepartments,
  selectDepartments,
  updateSubject,
} from "../../../reducers/Speciality.slice";
import {
  fetchGroups,
  fetchLevels,
  selectGroups,
  selectLevels,
} from "../../../reducers/Level.slice";

const { Option } = Select;

function UpdateCourse({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const levels = useSelector(selectLevels);
  const users = useSelector(selectAllUser);
  const departments = useSelector(selectDepartments);
  const groups = useSelector(selectGroups);

  const teatchers = users.filter((us) => us.isInstructor);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchAllUsers());
  }, []);

  const onClickSubmit = (entry) => {
    console.log("entry", entry);
    dispatch(
      updateSubject({
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
          description: "Updated successfully",
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

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

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
      initialValue: record?.duration,
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
      <Button type="primary" onClick={() => setShowModal(!showModal)}>
        Edit
      </Button>
      <Modal
        style={{ minHeight: "1500px !important" }}
        title="Update"
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
          onFinish={onClickSubmit}
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

UpdateCourse.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default UpdateCourse;
