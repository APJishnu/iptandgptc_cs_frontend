"use client";

import React, { useState } from "react";
import { Form, message } from "antd";
import FormField from "@/themes/components/reusbale-fields/reusable-fields";
import styles from "./login-form.module.scss";
import Button from "@/themes/components/button/button";
import { useRouter } from "next/navigation";
import UseAdminLogin from "../../services/admin-login-services";
import Cookies from "js-cookie";
import { ValidationError } from "@/interfaces/admin/login/admin-login-interfaces";

export interface AdminLoginValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: AdminLoginValues) => {
    setLoading(true);
    try {
      const loginResult = await UseAdminLogin().adminLogin(values);

      if (loginResult.status) {
        // Success: Store token in cookies and redirect
        message.success(loginResult.message);
        // Cookies.set("admin_token", loginResult.token as string, {
        //   expires: 1, // 1 day
        //   secure: true, // Required for production (HTTPS)
        //   sameSite: "none", // Must be "none" for cross-domain
        //   httpOnly: true, // Prevents client-side access
        // });
        router.push("/admin");
      } else {
        // Handle validation errors on respective fields
        form.setFields(
          loginResult.errors?.map((error: ValidationError) => ({
            name: error.field,
            errors: [error.message],
          })) || []
        );
        message.error(loginResult.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      message.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.loginForm}
      >
        <div className={styles.heading}>ADMIN LOGIN</div>

        <FormField
          className={styles.input}
          type="input"
          label="Email"
          name="email"
          required
          placeholder="Enter your email"
          rules={[
            { type: "email", message: "Please enter a valid email address" },
          ]}
        />
        <FormField
          className={styles.input}
          type="input"
          label="Password"
          name="password"
          required
          placeholder="Enter your password"
        />

        <Form.Item className={styles.formItemButton}>
          <Button
            type="button"
            label="Login"
            loading={loading}
            className={styles.loginButton}
            onClick={() => form.submit()}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
