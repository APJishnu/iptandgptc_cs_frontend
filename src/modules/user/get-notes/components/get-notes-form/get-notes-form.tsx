"use client";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import styles from "./get-notes-form.module.scss";
import Button from "@/themes/components/button/button";
import { SubjectData, ModuleData } from "@/interfaces/get-notes/get-notes-interface";
import UseResourcesServices from "@/modules/admin/resources/services/resources-services/resources-services";

interface GetNotesFormProps {
  getNote: (filters: { semester: number[]; subject: string[]; module: string[] }) => void;
}

const GetNotesForm: React.FC<GetNotesFormProps> = ({ getNote }) => {
  const [filters, setFilters] = useState({ semester: [], subject: [], module: [] });
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectData[]>([]);
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [filteredModules, setFilteredModules] = useState<ModuleData[]>([]);

  const fetchSubjects = async () => {
    try {
      const response = await UseResourcesServices().getSubjectsWithModules();
      if (response.status) {
        setSubjects(response.data);
        setFilteredSubjects(response.data); // Initially, show all subjects
        setModules(response.data.flatMap((s) => s.modules)); // Get all modules
        setFilteredModules(response.data.flatMap((s) => s.modules)); // Initially show all modules
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Handle filter change
  const handleChange = (key: keyof typeof filters, value: string[]) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    

    if (key === "semester") {
      // Filter subjects based on selected semester(s)
      const selectedSubjects = subjects.filter((s) => value.map(Number).includes(s.semester));
      setFilteredSubjects(value.length ? selectedSubjects : subjects);

      // Reset subject and module selections when semester changes
      setFilters({ ...updatedFilters, subject: [], module: [] });
      setFilteredModules([]);
    }

    if (key === "subject") {
      // Filter modules based on selected subjects
      const selectedModules = subjects
        .filter((s) => value.includes(s._id))
        .flatMap((s) => s.modules);

      setFilteredModules(value.length ? selectedModules : modules);

      // Reset module selection when subject changes
      setFilters({ ...updatedFilters, module: [] });
    }
    getNote(updatedFilters);
  };

  // Clear all filters
  const handleClearAll = () => {
    setFilters({ semester: [], subject: [], module: [] });
    setFilteredSubjects(subjects);
    setFilteredModules(modules);
    getNote({ semester: [], subject: [], module: [] });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {/* Semester Select */}
        <Select
          mode="multiple"
          placeholder="Select Semester"
          value={filters.semester}
          onChange={(value) => handleChange("semester", value)}
          className={styles.select}
          options={[1, 2, 3, 4, 5, 6].map((num) => ({ value: num, label: `Semester ${num}` }))}
          maxTagCount={1}
        />

        {/* Subject Select (Filtered based on selected semester) */}
        <Select
          mode="multiple"
          placeholder="Select Subject"
          value={filters.subject}
          onChange={(value) => handleChange("subject", value)}
          className={styles.select}
          options={filteredSubjects.map((s) => ({ value: s._id, label: s.name }))}
          maxTagCount={1}
        />

        {/* Module Select (Filtered based on selected subject) */}
        <Select
          mode="multiple"
          placeholder="Select Module"
          value={filters.module}
          onChange={(value) => handleChange("module", value)}
          className={styles.select}
          options={filteredModules.map((m) => ({ value: m._id, label: m.module_name }))}
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
