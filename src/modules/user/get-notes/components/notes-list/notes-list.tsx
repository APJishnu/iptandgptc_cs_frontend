"use client";
import React from "react";
import { ExportOutlined, LinkOutlined } from "@ant-design/icons";
import { Note } from "@/interfaces/get-notes/get-notes-interface";
import Button from "@/themes/components/button/button";
import CustomTable from "@/themes/components/custom-table/custom-table"; // Import reusable table component

interface NotesListProps {
  notes: Note[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const columns = [
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Module", dataIndex: "module", key: "module" },
    { title: "Note", dataIndex: "description", key: "description" },
    {
      title: "Download",
      key: "download",
      render: (_: any, record: Note) => (
        <>
          {record.file_url && (
            <a href={record.file_url} target="_blank" rel="noopener noreferrer" download>
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
  ];

  return <CustomTable data={notes} columns={columns} rowKey="id" />;
};

export default NotesList;
