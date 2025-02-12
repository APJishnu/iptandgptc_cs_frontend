"use client";
import React from "react";
import { Spin } from "antd";
import styles from "./loader.module.scss";

const Loader: React.FC = () => {
  return (
        <Spin 
          size="large" 
          tip="Loading..."
          className={styles.spinLoader}
        />
  );
};

export default Loader;
