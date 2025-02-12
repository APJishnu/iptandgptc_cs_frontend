
"use client";
import React from "react";
import { Table } from "antd";
import styles from "./custom-table.module.scss";

interface CustomTableProps<T> {
  data: T[];
  columns: any[];
  rowKey?: string;
}

const CustomTable = <T,>({ data, columns, rowKey = "id" }: CustomTableProps<T>) => {
  return (
    <div className={styles.tableWrapper}>
      <Table className={styles.tableClass} dataSource={data} columns={columns} rowKey={rowKey} pagination={false}/>
    </div>
  );
};

export default CustomTable;
