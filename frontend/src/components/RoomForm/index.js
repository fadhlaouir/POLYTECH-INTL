/* eslint-disable react-hooks/exhaustive-deps */
/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Redux
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

// UI Components
import { Form, Button, Modal, notification } from "antd";
import FormBuilder from "antd-form-builder";

// reducers
import {
  fetchAllRooms,
  createRoom,
  updateRoom,
} from "../../reducers/Room.slice";

/* -------------------------------------------------------------------------- */
/*                                  Room Form                                 */
/* -------------------------------------------------------------------------- */
function RoomForm({ onChange, onlyFormItems, label, record }) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
  const onClickSubmit = (entry) => {
    if (record) {
      dispatch(
        updateRoom({
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
    } else {
      dispatch(
        createRoom({
          ...entry,
          isAvailable: true,
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
    }
  };
  /* -------------------------------- CONSTANTS ------------------------------- */
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
      widget: "number",
      initialValue: record?.capacity,
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
      widget: "switch",
      initialValue: record?.isAvailable,
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

RoomForm.propTypes = {
  record: PropTypes.object,
  label: PropTypes.string,
  isCreatedForm: PropTypes.bool,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

RoomForm.defaultProps = {
  isCreatedForm: false,
};

export default RoomForm;
