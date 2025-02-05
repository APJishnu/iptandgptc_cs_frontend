"use client";
import React from "react";
import { Button, Table } from "antd";
import styles from "./notes-list.module.scss";
import { DownloadOutlined } from "@ant-design/icons";

interface NotesListProps {
    notes: { 
      id: number; 
      semester: string; 
      subject: string; 
      module: string; 
      note: string; 
      downloadLink: string; 
    }[];
  }

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const columns = [
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Module", dataIndex: "module", key: "module" },
    { title: "Note", dataIndex: "note", key: "note" },
    {
        title: "",
        key: "action",
        render: (_: any, record: any) => (
          <a href={record.downloadLink} download>
            <Button icon={<DownloadOutlined />} type="link" />
          </a>
        ),
      },
  ];

  return (

    <div className={styles.notesTable}>
      <Table className={styles.tableClass} dataSource={notes} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default NotesList;
