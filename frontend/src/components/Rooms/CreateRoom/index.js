import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";
import {
  fetchAllRooms,
  createRoom as createSingleRoom,
} from "../../../reducers/Room.slice";

function CreateRoom({ onChange, onlyFormItems }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, []);

  const onClickSubmit = (entry) => {
    dispatch(
      createSingleRoom({
        ...entry,
      })
    )
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "Room",
          description: "Created successfully",
        });
        setShowModal(!showModal);
        dispatch(fetchAllRooms());
      })
      .catch(() =>
        notification.error({
          message: "Room",
          description: "An error occured",
        })
      );
  };

  const [form] = Form.useForm();

  const FormFields = [
    {
      key: "name",
      label: "Room Number",
      placeholder: "Room Number",
      rules: [
        {
          required: true,
          message: "Room Number is required",
        },
      ],
    },
    {
      key: "capacity",
      label: "Capacity",
      placeholder: "Capacity",
      widget: "number",
      rules: [
        {
          required: true,
          message: "Capacity is required",
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
        Create new Room
      </Button>
      <Modal
        style={{ minHeight: "1500px !important" }}
        title="Create new Room"
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

CreateRoom.propTypes = {
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default CreateRoom;
