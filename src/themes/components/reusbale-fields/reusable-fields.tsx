"use client";
import React from "react";
import { Form, Select, DatePicker, Input } from "antd";
import dayjs from "dayjs";
import styles from "./reusable-fields.module.scss";

const { Option } = Select;

export type InputType =
  | "select"
  | "datepicker"
  | "input"
  | "textarea";

export interface FormFieldProps {
  type: InputType;
  label: string;
  name: string;
  required?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  rows?: number;
  rules?: object[];
  classformItem?:string;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  name,
  required = false,
  value,
  onChange,
  placeholder,
  options = [],
  className,
  rows = 4,
  rules = [],
  classformItem,
}) => {
  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select
            value={value}
            onChange={onChange}
            className={`${styles.customSelect} ${className}`}
            placeholder={placeholder}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );

      case "datepicker":
        return (
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(date, dateString) => onChange?.(dateString)}
            className={`${styles.customDatePicker} ${className}`}
            placeholder={placeholder ?? "dd/mm/yyyy"}
          />
        );

      case "textarea":
        return (
          <Input.TextArea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={`${styles.customTextarea} ${className}`}
          />
        );

      case "input":
      default:
        return (
          <Input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`${styles.customInput} ${className}`}
          />
        );
    }
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[...(required ? [{ required: true, message: `Please enter ${label.toLowerCase()}` }] : []), ...rules]}
      className={`${styles.formItem} ${classformItem}`}
    >
      {renderField()}
    </Form.Item>
  );
};

export default FormField;
