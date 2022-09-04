# Lesson 3 AppStore Client 3

## Home Page

- Create src/components/HomePage.js

```javascript
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  List,
  message,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { searchApps, checkout } from "../utils";
import PostApps from "./PostApps";

const { TabPane } = Tabs;
const { Text } = Typography;

const BrowseApps = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const resp = await searchApps(query);
      setData(resp || []);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onFinish={handleSearch} layout="inline">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <List
        style={{ marginTop: 20 }}
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              key={item.id}
              title={
                <Tooltip title={item.description}>
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.title}
                  </Text>
                </Tooltip>
              }
              extra={<Text type="secondary">${item.price}</Text>}
              actions={[
                <Button
                  shape="round"
                  type="primary"
                  onClick={() => checkout(item.id)}
                >
                  Checkout
                </Button>,
              ]}
            >
              <Image src={item.url} width="100%" />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

const HomePage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Browse Apps" key="1">
        <BrowseApps />
      </TabPane>
      <TabPane tab="Post Apps" key="2">
        {/* <PostApps /> */}
      </TabPane>
    </Tabs>
  );
};

export default HomePage;
```

- In src/App.js, uncomment line to get the `HomePage` component in use

```javascript
const renderContent = () => {
  if (authed === undefined) {
    return <></>;
  }

  if (!authed) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return <HomePage />;
};
```

## Handle checkout result

Add another `useEffect` to handle the query string in src/App.js (**Do NOT override the whole file**)

```javascript
import { Layout, Dropdown, Menu, Button, message } from "antd";

// other code, don’t copy this line

useEffect(() => {
  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);

  if (query.get("success")) {
    message.success("Order placed!");
  }
}, []);

// other code, don’t copy this line
```

## Post App

- Create src/components/PostApps.js

```javascript
import React, { useRef, useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { uploadApp } from "../utils";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const PostApps = () => {
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFormSubmit = async (data) => {
    const { files } = fileInputRef.current;

    setLoading(true);

    try {
      await uploadApp(data, files[0]);
      message.success("upload successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...layout}
      onFinish={handleFormSubmit}
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>
      <Form.Item name="picture" label="Picture" rules={[{ required: true }]}>
        <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, type: "number", min: 0 }]}
      >
        <InputNumber prefix="$" precision={2} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostApps;
```

- In src/components/HomePage.js uncomment one line to get `PostApps` component in use

```javascript
const HomePage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Browse Apps" key="1">
        <BrowseApps />
      </TabPane>
      <TabPane tab="Post Apps" key="2">
        <PostApps />
      </TabPane>
    </Tabs>
  );
};
```
