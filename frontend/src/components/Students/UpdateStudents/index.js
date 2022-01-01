import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";

import {
  fetchAllUsers,
  fetchUser,
  updateUSer,
} from "../../../reducers/User.slice";
import {
  fetchAllSpecialities,
  fetchDepartments,
  selectDepartments,
} from "../../../reducers/Speciality.slice";
import {
  fetchGroups,
  fetchLevels,
  selectGroups,
  selectLevels,
} from "../../../reducers/Level.slice";

function UpdateStudents({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const levels = useSelector(selectLevels);
  const departments = useSelector(selectDepartments);
  const groups = useSelector(selectGroups);

  useEffect(() => {
    dispatch(fetchAllSpecialities());
    dispatch(fetchDepartments());
    dispatch(fetchAllUsers());
    dispatch(fetchGroups());
    dispatch(fetchLevels());
  }, []);

  const onClickSubmit = (entry) => {
    console.log("entry", entry);
    dispatch(
      updateUSer({
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
      disabled: true,
      rules: [
        {
          required: true,
          message: "email is required",
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
      options: levels?.map((item) => ({
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
      key: "groupe",
      label: "Group",
      placeholder: "Group",
      widget: "select",
      options: groups?.map((item) => ({
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

UpdateStudents.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default UpdateStudents;
