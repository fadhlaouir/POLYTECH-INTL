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
import { Form, Button, Modal, notification, Row, Col } from "antd";
import FormBuilder from "antd-form-builder";

// reducers
import {
  createUser,
  fetchAllUsers,
  fetchUser,
} from "../../reducers/User.slice";
import {
  fetchAllSpecialities,
  fetchDepartments,
  selectAllSpecialities,
  selectDepartments,
} from "../../reducers/Speciality.slice";
import {
  fetchAlllevels,
  fetchLevels,
  selectAlllevels,
  selectLevels,
} from "../../reducers/Level.slice";
import { fetchAllGroups, selectAllGroups } from "../../reducers/Group.slice";
import {
  fetchAllDepartments,
  selectAllDepartments,
} from "../../reducers/Department.slice";
import { fetchAllRooms, selectAllRooms } from "../../reducers/Room.slice";
import { fetchAllCourses, selectAllCourses } from "../../reducers/Course.slice";

/* -------------------------------------------------------------------------- */
/*                              Generate Schedule                             */
/* -------------------------------------------------------------------------- */
function CreateSchedule({ onChange, onlyFormItems, record }) {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // Selectors
  const departments = useSelector(selectAllDepartments);
  const groups = useSelector(selectAllGroups);
  const rooms = useSelector(selectAllRooms);
  const courses = useSelector(selectAllCourses);

  useEffect(() => {
    dispatch(fetchAllSpecialities());
    dispatch(fetchAllGroups());
    dispatch(fetchAlllevels());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllRooms());
    dispatch(fetchAllUsers());
    dispatch(fetchAllCourses());
  }, []);

  /* ----------------------------- RENDER HELPERS ----------------------------- */
  /**
   *
   * @param {object} entry data entry from form
   */
  const onClickSubmit = (entry) => {
    // dispatch(
    //   createUser({
    //     ...entry,
    //     isStudent: true,
    //   })
    // )
    //   .then(unwrapResult)
    //   .then(() => {
    //     notification.success({
    //       message: "Student",
    //       description: "Created successfully",
    //     });
    //     setShowModal(!showModal);
    //     dispatch(fetchAllUsers());
    //   })
    //   .catch(() =>
    //     notification.error({
    //       message: "Student",
    //       description: "An error occured",
    //     })
    //   );
    console.log("entry", entry);
  };

  /* -------------------------------- CONSTANTS ------------------------------- */
  const [form] = Form.useForm();
  // Get Level by selected departments
  const getDepartmentSelectedField = form.getFieldValue("department");
  const levelBySelectedDepartment = departments.find(
    (dep) => dep.id === getDepartmentSelectedField
  );
  // Get Group by selected levels
  const getLevelSelectedField = form.getFieldValue("level");
  const getGoupByLevel = groups.filter(
    (gr) =>
      gr.level.id === getLevelSelectedField &&
      gr.department?.id === getDepartmentSelectedField
  );

  // get selected room
  const getSelectedRoom = form.getFieldValue("room");
  const getRoomById = rooms.find((room) => room.id === getSelectedRoom);

  const FormFields = [
    {
      key: "department",
      label: "departments",
      placeholder: "Select Department",
      widget: "select",
      initialValue: record?.department,
      options: departments?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "department is required",
        },
      ],
    },
    {
      key: "level",
      label: "level",
      placeholder: "Select level",
      widget: "select",
      options: levelBySelectedDepartment?.levels.map((item) => ({
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
      placeholder: "Select Group",
      widget: "select",
      options: getGoupByLevel?.map((item) => ({
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
    {
      key: "room",
      label: "Room",
      placeholder: "Select Room",
      widget: "select",
      options: rooms
        ?.filter((r) => r.isAvailable !== false)
        .map((item) => ({
          label: item.name,
          value: item.id,
        })),
      rules: [
        {
          required: true,
          message: "Room is required",
        },
      ],
      extra: `Maximum students capacity is ${getRoomById?.capacity}`,
    },
    {
      key: "course",
      label: "Course",
      placeholder: "Select Course",
      widget: "select",
      options: courses.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      rules: [
        {
          required: true,
          message: "Course is required",
        },
      ],
    },
    { key: "day", label: "Select the Day", widget: "date-picker" },
    {
      key: "time",
      label: "Lecture Date",
      readOnly: true,
      viewWidget: () => {
        return (
          <Row>
            <Col span={11}>
              <FormBuilder
                form={form}
                meta={{
                  key: "startDate",
                  widget: "date-picker",
                  widgetProps: { style: { width: "100%" } },
                  noStyle: true,
                }}
              />
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              -
            </Col>
            <Col span={11}>
              <FormBuilder
                form={form}
                meta={{
                  key: "endDate",
                  widget: "date-picker",
                  widgetProps: { style: { width: "100%" } },
                  noStyle: true,
                }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  // force update form
  const forceUpdate = FormBuilder.useForceUpdate();
  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setShowModal(!showModal)}
      >
        Add extra Lecture Manualy
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

CreateSchedule.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  onlyFormItems: PropTypes.bool,
};

export default CreateSchedule;
