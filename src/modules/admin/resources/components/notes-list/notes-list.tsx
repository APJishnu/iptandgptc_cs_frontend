"use client";
import React, { useState } from "react";
import styles from "./notes-list.module.scss";
import TabComponent from "@/themes/admin/components/tabs/tabs";
import { Table, message } from "antd";
import Button from "@/themes/components/button/button";
import { ExportOutlined } from "@ant-design/icons";
import { Note } from "@/interfaces/get-notes/get-notes-interface";
import AddNoteModal from "../add-note-modal/add-note-modal";

const NotesList: React.FC = () => {
  const [activeKey, setActiveKey] = useState("notes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, semester: "Semester 1", subject: "Mathematics", module: "Algebra", note: "Basic algebra concepts", downloadLink: "/notes/algebra" },
    { id: 2, semester: "Semester 2", subject: "Physics", module: "Mechanics", note: "Newton's laws", downloadLink: "/notes/mechanics.pdf" },
    { id: 3, semester: "Semester 3", subject: "Computer Science", module: "Data Structures", note: "Introduction to arrays", downloadLink: "/notes/data-structures.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
    { id: 4, semester: "Semester 1", subject: "Mathematics", module: "Geometry", note: "Basic Geometry principles", downloadLink: "/notes/geometry.pdf" },
  ]);

  const columns = [
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Module", dataIndex: "module", key: "module" },
    { title: "Note", dataIndex: "note", key: "note" },
    {
      title: "",
      key: "action",
      render: (_: any, record: any) => (
        <a href={record.downloadLink} target="_blank" rel="noopener noreferrer">
          <Button icon={<ExportOutlined />} htmlType="link" />
        </a>
      ),
    },
  ];

  // Open Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

 

  const tabs = [
    {
      key: "notes",
      label: "Notes List",
      content: (
        <div className={styles.notesContent}>
          <Table className={styles.antTable} columns={columns} dataSource={notes} pagination={false} />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.notesListWrapper}>
      <TabComponent
        headings={tabs}
        activeKey={activeKey}
        onChange={setActiveKey}
        subHeading={
          <Button label="Add Note" className={styles.addNoteBtn} onClick={showModal} />
        }
      />

      {/* Reusable AddNoteModal Component */}
      <AddNoteModal open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default NotesList;
