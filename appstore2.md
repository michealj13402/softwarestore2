# Lesson 2 AppStore Client 2

## Layout and Authentication

- Remove the src/App.css file, we won't need it.

- Update src/App.js

```javascript
import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";

const { Header, Content } = Layout;

const App = () => {
  const [authed, setAuthed] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthed(authToken !== null);
  }, []);

  // const handleLoginSuccess = () => {
  //   setAuthed(true);
  // };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthed(false);
  };

  const renderContent = () => {
    return <></>;
    // if (authed === undefined) {
    //   return <></>;
    // }

    // if (!authed) {
    //   return <LoginForm onLoginSuccess={handleLoginSuccess} />;
    // }

    // return <HomePage />;
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          App Store
        </div>
        {authed && (
          <div>
            <Dropdown trigger="click" overlay={userMenu}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        )}
      </Header>
      <Content
        style={{ height: "calc(100% - 64px)", padding: 20, overflow: "auto" }}
      >
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default App;
```

## Signup and login

- Build a new component at src/components/SignupButton.js

```javascript
import { Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { register } from "../utils";

const SignupButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegisterOnClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);

    try {
      await register(data);
      message.success("Sign up successfully");
      setModalVisible(false);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="link"
        style={{ padding: 0 }}
        onClick={handleRegisterOnClick}
      >
        Register Now!
      </Button>
      <Modal
        title="Sign Up"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
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
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignupButton;
```

- Build a new component at src/components/LoginForm.js

```javascript
import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SignupButton from "./SignupButton";
import { login } from "../utils";

const LoginForm = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);

    try {
      await login(data);
      onLoginSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
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
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
          Or <SignupButton />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
```

- Uncomment the code in App.js to get "LoginForm" into the play. `**Do NOT Override the whole file**`

```javascript
const handleLoginSuccess = () => {
  setAuthed(true);
};

const renderContent = () => {
  if (authed === undefined) {
    return <></>;
  }

  if (!authed) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // return <HomePage />;
};
```
