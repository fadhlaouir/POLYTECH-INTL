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
import {
  Form,
  Button,
  Modal,
  notification,
  Select,
  Row,
  Col,
  InputNumber,
} from "antd";
import FormBuilder from "antd-form-builder";
import { AppstoreAddOutlined, EditOutlined } from "@ant-design/icons";

// reducers
import {
  updateDepartment,
  createDepartment,
  fetchAllDepartments,
} from "../../reducers/Department.slice";
import { fetchAlllevels, selectAlllevels } from "../../reducers/Level.slice";

/* -------------------------------------------------------------------------- */
/*                            Department Component                            */
/* -------------------------------------------------------------------------- */
function DepartmentForm({
  onChange,
  onlyFormItems,
  label,
  record,
  isCreatedForm,
}) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [showModal, setShowModal] = useState(false);
  const [levelValues, setLevelValues] = useState(null);
  const { Option } = Select;
  const dispatch = useDispatch();

  const levels = useSelector(selectAlllevels);

  useEffect(() => {
    dispatch(fetchAllDepartments());
    dispatch(fetchAlllevels());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
  const onClickSubmit = (entry) => {
    if (record) {
      dispatch(
        updateDepartment({
          id: record.id,
          fields: {
            ...entry,
          },
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Update Department",
            description: "Department was Updated successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllDepartments());
        })
        .catch(() =>
          notification.error({
            message: "Update Department",
            description: "An error occured",
          })
        );
    } else {
      dispatch(
        createDepartment({
          ...entry,
        })
      )
        .then(unwrapResult)
        .then(() => {
          notification.success({
            message: "Create New Department",
            description: "Department was Created successfully",
          });
          setShowModal(!showModal);
          dispatch(fetchAllDepartments());
        })
        .catch(() =>
          notification.error({
            message: "Create New Department",
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
    {
      key: "levels",
      label: "Level",
      placeholder: "Select level",
      initialValue: record?.levels,
      widget: "checkbox-group",
      options: levels?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    },
  ];
  // force update form
  const forceUpdate = FormBuilder.useForceUpdate();
  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(!showModal)}>
        {isCreatedForm ? <AppstoreAddOutlined /> : <EditOutlined />} {label}
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
          onValuesChange={forceUpdate}
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

DepartmentForm.propTypes = {
  record: PropTypes.object,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default DepartmentForm;
