import React, { useRef, useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const PostApps = () => {
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFormSubmit = async (values) => {
    // const formData = new FormData();
    // const { files } = this.fileInputRef.current;
    // if (files.length > 5) {
    //   message.error("You can at most upload 5 pictures.");
    //   return;
    // }
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("images", files[i]);
    // }
    // formData.append("name", values.name);
    // formData.append("address", values.address);
    // formData.append("description", values.description);
    // formData.append("guest_number", values.guest_number);
    // this.setState({
    //   loading: true,
    // });
    // try {
    //   await uploadStay(formData);
    //   message.success("upload successfully");
    // } catch (error) {
    //   message.error(error.message);
    // } finally {
    //   this.setState({
    //     loading: false,
    //   });
    // }
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
        <InputNumber prefix="$" />
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
