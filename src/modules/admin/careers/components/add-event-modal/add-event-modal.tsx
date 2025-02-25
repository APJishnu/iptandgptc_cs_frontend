"use client";
import React, { useState } from "react";
import { Modal, Form, message } from "antd";
import FormField from "@/themes/components/reusbale-fields/reusable-fields";
import styles from "./add-event-modal.module.scss";
import UseEventServices from "../../services/careers-services";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setLoading(true);
      const response = await UseEventServices().addEvent(values);

      if (response.status) {
        message.success(response.message);
        form.resetFields();
        onClose();
      } else {
        // Handle validation errors on respective fields
        form.setFields(
          response.errors?.map((error) => ({
            name: error.field,
            errors: [error.message],
          })) || []
        );
        message.error(response.message);
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Event"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Add Event"
      className={styles.modal}
    >
      <Form form={form} layout="vertical" className={styles.form}>
        <FormField
          type="select"
          label="Category"
          name="category"
          required
          options={[
            { value: "featured-news", label: "Featured News" },
            { value: "upcoming-events", label: "Upcoming Events" },
          ]}
          className={styles.input}
        />
        <FormField type="input" label="Event Title" name="title" required className={styles.input} />
        <FormField type="textarea" label="Description" name="description" rows={3} className={styles.textArea} />
        <FormField type="input" label="Link" name="link" className={styles.input} />
        <div className={styles.datePickerDiv}>
          <FormField type="datepicker" label="Start Date" name="startDate" required className={styles.input} />
          <FormField type="datepicker" label="End Date" name="endDate" className={styles.input} />
        </div>
      </Form>
    </Modal>
  );
};

export default AddEventModal;
