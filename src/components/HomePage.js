import { Button, Card, Form, Input, List, Tabs, Typography } from "antd";
import { useState } from "react";
import Checkout from "./Checkout";
import PostApps from "./PostApps";

const { TabPane } = Tabs;
const { Text } = Typography;

const BrowseApps = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async (query) => {
    // this.setState({
    //   loading: true,
    // });
    // try {
    //   const resp = await searchStays(query);
    //   this.setState({
    //     data: resp,
    //   });
    // } catch (error) {
    //   message.error(error.message);
    // } finally {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  };

  return (
    <>
      <Form onFinish={handleSearch} layout="inline">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.name}
                  </Text>
                </div>
              }
              extra={<></>}
            >
              {/* {item.images.map((image, index) => (
                  <div key={index}>
                    <Image src={image.url} width="100%" />
                  </div>
                ))} */}
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
        <PostApps />
      </TabPane>
    </Tabs>
  );
};

export default HomePage;
