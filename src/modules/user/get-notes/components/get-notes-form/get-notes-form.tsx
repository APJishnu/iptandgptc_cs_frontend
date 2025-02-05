"use client";
import React, { useState } from "react";
import { Select} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import styles from "./get-notes-form.module.scss";
import Button from "@/themes/components/button/button";

interface GetNotesFormProps {
  getNote: (filters: { semester: string[]; subject: string[]; module: string[] }) => void;
}

const GetNotesForm: React.FC<GetNotesFormProps> = ({ getNote }) => {
  const [filters, setFilters] = useState({
    semester: [],
    subject: [],
    module: [],
  });

  // Update filter values
  const handleChange = (key: keyof typeof filters, value: string[]) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    getNote(updatedFilters);
  };

  // Clear all filters
  const handleClearAll = () => {
    const clearedFilters = { semester: [], subject: [], module: [] };
    setFilters(clearedFilters);
    getNote(clearedFilters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Select
          mode="multiple"
          placeholder="Select Semester"
          value={filters.semester}
          onChange={(value) => handleChange("semester", value)}
          className={styles.select}
          options={[
            { value: "Semester 1", label: "Semester 1" },
            { value: "Semester 2", label: "Semester 2" },
            { value: "Semester 3", label: "Semester 3" },
          ]}
          maxTagCount={1}
        />
        <Select
          mode="multiple"
          placeholder="Select Subject"
          value={filters.subject}
          onChange={(value) => handleChange("subject", value)}
          className={styles.select}
          options={[
            { value: "Mathematics", label: "Mathematics" },
            { value: "Physics", label: "Physics" },
            { value: "Computer Science", label: "Computer Science" },
          ]}
          maxTagCount={1}
        />
        <Select
          mode="multiple"
          placeholder="Select Module"
          value={filters.module}
          onChange={(value) => handleChange("module", value)}
          className={styles.select}
          options={[
            { value: "Algebra", label: "Algebra" },
            { value: "Mechanics", label: "Mechanics" },
            { value: "Data Structures", label: "Data Structures" },
            { value: "Geometry", label: "Geometry" },
          ]}
          maxTagCount={1}
        />

        <Button className={styles.clearButton} onClick={handleClearAll} icon={<CloseCircleOutlined />}>
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default GetNotesForm;