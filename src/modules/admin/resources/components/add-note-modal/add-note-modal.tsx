import React from "react";
import { Modal, Form, Select, Input, Upload, message } from "antd";
import Button from "@/themes/components/button/button";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./add-note-modal.module.scss";
import UseResourcesServices from "../../services/resources-services/resources-services";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const semesters = [
    { id: 1, label: "Semester 1" },
    { id: 2, label: "Semester 2" },
    { id: 3, label: "Semester 3" },
  ];

  const subjects = [
    { id: "101", label: "Mathematics" },
    { id: "102", label: "Physics" },
    { id: "103", label: "Computer Science" },
  ];

  const modules = [
    { id: "201", label: "Algebra" },
    { id: "202", label: "Mechanics" },
    { id: "203", label: "Data Structures" },
    { id: "204", label: "Geometry" },
  ];

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const formattedValues = {
          semester: values.semester,
          subject: values.subject,
          module: values.module,
          note: values.note,
          link: values.link || "",
          file: values.file?.file || null, // Extract file object
        };

        try {
          const response = await UseResourcesServices().addNote(formattedValues);
          if (response.status) {
            message.success("Note added successfully!");
            form.resetFields();
            onClose();
          } else {
            message.error(response.message || "Failed to add note");
          }
        } catch (error) {
          message.error("An error occurred while adding the note.");
          console.error(error);
        }
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal title="Add New Note" open={open} onOk={handleOk} onCancel={onClose} okText="Add Note" className={styles.addNoteModal}>
      <Form form={form} layout="vertical">
        <Form.Item name="semester" label="Semester" rules={[{ required: true, message: "Please select a semester!" }]}>
          <Select placeholder="Select Semester" className={styles.select}>
            {semesters.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="subject" label="Subject" rules={[{ required: true, message: "Please select a subject!" }]}>
          <Select placeholder="Select Subject" className={styles.select}>
            {subjects.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="module" label="Module" rules={[{ required: true, message: "Please select a module!" }]}>
          <Select placeholder="Select Module" className={styles.select}>
            {modules.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="note" label="Note" rules={[{ required: true, message: "Please enter note description!" }]}>
          <Input placeholder="Enter Note Description" />
        </Form.Item>

        <Form.Item name="link" label="Link (Optional)">
          <Input placeholder="Paste link here (if any)" />
        </Form.Item>

        <Form.Item name="file" label="Upload File (Optional)">
          <Upload beforeUpload={() => false} listType="text">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;
