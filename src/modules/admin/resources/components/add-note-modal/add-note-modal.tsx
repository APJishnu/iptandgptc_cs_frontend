import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Input, Upload, message } from "antd";
import Button from "@/themes/components/button/button";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./add-note-modal.module.scss";
import UseResourcesServices from "../../services/resources-services/resources-services";
import { AddNoteData, ModuleData, SubjectData } from "@/interfaces/get-notes/get-notes-interface";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { getSubjectsWithModules, addNote } = UseResourcesServices();

  const [subjects, setSubjects] = useState<{ id: string; label: string }[]>([]);
  const [modules, setModules] = useState<{ id: string; label: string }[]>([]);
  const [data, setData] = useState<SubjectData[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);


  // Static semesters (1 to 6)
  const semesters = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    label: `Semester ${i + 1}`,
  }));

  // Fetch subjects and modules when modal opens
  useEffect(() => {
    if (open) {
      const fetchSubjectsWithModules = async () => {
        try {
          const fetchedData = await getSubjectsWithModules();
          if (fetchedData.status) {
            setData(fetchedData.data);
          } else {
            message.error("Failed to fetch subjects");
          }
        } catch (error) {
          console.error("Error fetching subjects:", error);
          message.error("An error occurred while fetching subjects.");
        }
      };

      fetchSubjectsWithModules();
    }
  }, [open]);

  // Handle Semester Change -> Filter Subjects
  const handleSemesterChange = (semesterId: number) => {
    const filteredSubjects = data
      .filter((subject) => subject.semester === semesterId)
      .map((subject) => ({
        id: subject._id,
        label: subject.name,
      }));

    setSubjects(filteredSubjects);
    setModules([]); // Reset modules when changing semester
    form.setFieldsValue({ subject: undefined, module: undefined });
  };

  // Handle Subject Change -> Filter Modules
  const handleSubjectChange = (subjectId: string) => {
    const selectedSubject = data.find((subject) => subject._id === subjectId);
    if (selectedSubject) {
      const formattedModules = selectedSubject.modules.map((module: ModuleData) => ({
        id: module._id,
        label: module.module_name,
      }));
      setModules(formattedModules);
    }
    form.setFieldsValue({ module: undefined });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const noteData: AddNoteData = {
          semester: values.semester,
          subject: values.subject,
          module: values.module,
          description: values.description,
          link: values.link || undefined,
          file:uploadedFile  || undefined,
        };

        try {
          const response = await addNote(noteData);
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
    <Modal
      title="Add New Note"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Add Note"
      className={styles.addNoteModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="semester"
          label="Semester"
          rules={[{ required: true, message: "Please select a semester!" }]}
        >
          <Select
            placeholder="Select Semester"
            className={styles.select}
            onChange={handleSemesterChange}
          >
            {semesters.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: "Please select a subject!" }]}
        >
          <Select
            placeholder="Select Subject"
            className={styles.select}
            onChange={handleSubjectChange}
            disabled={subjects.length === 0} // Disable if no subjects are available
          >
            {subjects.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="module"
          label="Module"
          rules={[{ required: true, message: "Please select a module!" }]}
        >
          <Select placeholder="Select Module" className={styles.select} disabled={modules.length === 0}>
            {modules.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter note description!" }]}
        >
          <Input placeholder="Enter Note Description" />
        </Form.Item>

        <Form.Item name="link" label="Link">
          <Input placeholder="Paste link here (if any)" />
        </Form.Item>

        <Form.Item name="file" label="Upload File">
        <Upload
    beforeUpload={(file) => {
      setUploadedFile(file);
      return false; // Prevent default upload behavior
    }}
    listType="text"
    maxCount={1} // Limit to one file
  >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;
