import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";

import {
  fetchAllUsers,
  fetchUser,
  updateUSer,
} from "../../../reducers/User.slice";

/* -------------------------------------------------------------------------- */
/*                                Sieving Form                                */
/* -------------------------------------------------------------------------- */
function UpdateTeatcher({ onChange, onlyFormItems, record }) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   * @param {object} entry
   */
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
  console.log("record", record);
  const sievingFormFields = [
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
          <FormBuilder form={form} meta={sievingFormFields} />
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

UpdateTeatcher.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default UpdateTeatcher;
