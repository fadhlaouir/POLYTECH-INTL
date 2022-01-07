import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";

import {
  fetchAllRooms,
  fetchRoom,
  updateRoom as updateSingleRoom,
} from "../../../reducers/Room.slice";

function UpdateRoom({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
    dispatch(fetchRoom(record.id));
  }, []);

  const onClickSubmit = (entry) => {
    dispatch(
      updateSingleRoom({
        id: record.id,
        fields: {
          ...entry,
        },
      })
    )
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "Room",
          description: "Updated successfully",
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
      initialValue: record?.name,
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
      initialValue: record?.capacity,
      widget: "number",
      rules: [
        {
          required: true,
          message: "Capacity is required",
        },
      ],
    },
    {
      key: "isAvailable",
      label: "isAvailable",
      placeholder: "isAvailable",
      initialValue: record?.isAvailable,
      widget: "switch",
      rules: [
        {
          required: true,
          message: "isAvailable is required",
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
        title="Update Room"
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

UpdateRoom.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default UpdateRoom;
