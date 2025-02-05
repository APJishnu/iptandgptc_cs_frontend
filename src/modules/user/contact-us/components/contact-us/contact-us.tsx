"use client";

import { useState } from "react";
import { Form, Input, Button } from "antd";
import styles from "./contact-us.module.scss";

const { TextArea } = Input; // Extracting TextArea from Ant Design's Input

const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: { name: string; email: string; message: string }) => {
    setLoading(true);
    console.log("Form Submitted:", values);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>Contact Us</h1>
      </div>
      {/* Left: Map */}
      <div className={styles.contactContent}>
      <div className={styles.map}>
        <iframe
          className={styles.iframe}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.337240196365!2d76.262957275042!3d10.785461989363824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7c4ca047e0f1d%3A0x528e44cfc6ee30c7!2sIPT%26GPTC%2CShoranur!5e0!3m2!1sen!2sin!4v1738226286943!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Right: Contact Form */}
      <div className={styles.formContainer}>
        <h2>Contact Us</h2>
        <p>We&apos;d love to hear from you! Please fill out the form below, and we&apos;ll get back to you as soon as possible.</p>

        <Form layout="vertical" onFinish={handleSubmit}>
            <div className={styles.flexInputs}>
          {/* Name Field */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your full name!" }]}
            className={styles.formItem}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          </div>

          {/* Message Field */}
          <Form.Item
            
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <TextArea placeholder="Enter your message" rows={3} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button htmlType="submit" loading={loading} className={styles.submitButton}>
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
