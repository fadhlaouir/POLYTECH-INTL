import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { Form, Button, Modal, notification, Row, Col, Select } from "antd";
import FormBuilder from "antd-form-builder";

import {
  updateDepartment as updateSingleDepartment,
  fetchAllDepartments,
  fetchDepartment,
} from "../../../reducers/Department.slice";

function UpdateDepartment({ onChange, onlyFormItems, record }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, []);

  const onClickSubmit = (entry) => {
    console.log("entry", entry);
    dispatch(
      updateSingleDepartment({
        id: record.id,
        fields: {
          ...entry,
        },
      })
    )
      .then(unwrapResult)
      .then(() => {
        notification.success({
          message: "Course",
          description: "Updated successfully",
        });
        setShowModal(!showModal);
        dispatch(fetchDepartment(record.id));
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
      label: "Department Name",
      placeholder: "Department Name",
      initialValue: record?.name,
      rules: [
        {
          required: true,
          message: "Department Name is required",
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
        title="Update Department"
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

UpdateDepartment.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default UpdateDepartment;
