import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SignupButton from "./SignupButton";

const LoginForm = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = () => {
    onLoginSuccess();
  };

  return (
    <div style={{ width: 500, margin: "20px auto" }}>
      <Form onFinish={handleFormSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            disabled={loading}
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password disabled={loading} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
          Or <SignupButton />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
