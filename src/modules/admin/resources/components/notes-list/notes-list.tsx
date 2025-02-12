"use client";
import React, { useEffect, useState } from "react";
import styles from "./notes-list.module.scss";
import TabComponent from "@/themes/admin/components/tabs/tabs";
import { Popconfirm, Table, message } from "antd";
import Button from "@/themes/components/button/button";
import {
  DeleteOutlined,
  ExportOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Note } from "@/interfaces/get-notes/get-notes-interface";
import AddNoteModal from "../add-note-modal/add-note-modal";
import UseResourcesServices from "../../services/resources-services/resources-services";

const NotesList: React.FC = () => {
  const [activeKey, setActiveKey] = useState("notes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const getAllNotes = async () => {
    try {
      const data = await UseResourcesServices().getAllNotes();
      if (data.status) {
        setNotes(data.data); // Directly set API response
      } else {
        message.error("Failed to fetch notes.");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      message.error("An error occurred while fetching notes.");
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await UseResourcesServices().deleteNote(id);
    if (result.status) {
      message.success(result.message);
      getAllNotes();
    } else {
      message.error(result.message);
      getAllNotes();
    }
  };

  const columns = [
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Module", dataIndex: "module", key: "module" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Download",
      key: "download",
      render: (_: any, record: Note) => (
        <>
          {record.file_url && (
            <a
              href={record.file_url}
              target="_blank"
              rel="noopener noreferrer"
              download // Add this to trigger a download instead of opening in-browser
            >
              <Button icon={<ExportOutlined />} htmlType="link" />
            </a>
          )}
          {record.link_url && (
            <a href={record.link_url} target="_blank" rel="noopener noreferrer">
              <Button icon={<LinkOutlined />} htmlType="link" />
            </a>
          )}
        </>
      ),
    },

    {
      title: "",
      dataIndex: "action",
      render: (_: any, record: Note) =>
        record.id ? (
          <Popconfirm
            title="Delete this note?"
            description="This action cannot be undone."
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
            placement="topRight"
          >
            <Button icon={<DeleteOutlined />} htmlType="link" danger />
          </Popconfirm>
        ) : null,
    },
  ];

  const showModal = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    getAllNotes();
  };

  const tabs = [
    {
      key: "notes",
      label: "Notes List",
      content: (
        <div className={styles.notesContent}>
          <Table
            className={styles.antTable}
            columns={columns}
            dataSource={notes}
            pagination={false}
          />
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
          <Button
            label="Add Note"
            className={styles.addNoteBtn}
            onClick={showModal}
          />
        }
      />

      {/* Reusable AddNoteModal Component */}
      <AddNoteModal open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default NotesList;
