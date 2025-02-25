"use client";

import React from "react";
import { Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomTable from "@/themes/components/custom-table/custom-table";
import { EventData } from "@/interfaces/admin/add-events/add-events-interfaces";
import styles from "./events-table.module.scss";

interface EventsTableProps {
  events: EventData[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  // Delete event handler
  const handleDelete = async (id?: string) => {
    try {
      message.success(`Event deleted successfully`);
    } catch (error) {
      message.error("Failed to delete event");
    }
  };

  // Edit event handler
  const handleEdit = (id?: string) => {
    console.log("Edit event with ID:", id);
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      className: styles.smallText,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: styles.smallText,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: styles.smallText,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (text: string) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Visit
          </a>
        ) : "--",
      className: styles.smallText,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      className: styles.smallText,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      className: styles.smallText,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: EventData) =>
        record.id ? (
          <div className={styles.actionButtons}>
            <Button type="default" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
            <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
              <Button type="default" icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        ) : null,
      className: styles.smallText,
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <CustomTable data={events} columns={columns} rowKey="id" />
    </div>
  );
};

export default EventsTable;
