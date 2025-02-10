import React from "react";
import { Button as AntButton } from "antd";
import styles from "./button.module.scss";

interface ButtonProps {
  label?:string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  htmlType?: "link" | "text" | "default" | "primary" ;
  block?: boolean;
  danger?: boolean;
  loading?:boolean;
  icon?:React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  htmlType = "default",
  block = false,
  danger = false,
  loading,
  icon
}) => {
  return (
    <AntButton
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
      block={block}
      danger={danger}
      loading={loading}
      icon={icon}
    >
      {children?children:label}
    </AntButton>
  );
};

export default Button;
