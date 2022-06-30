import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const { Header, Content } = Layout;

const App = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken !== undefined) {
      setAuthed(true);
    }
  }, []);

  // const handleLoginSuccess = (token, asHost) => {
  //   localStorage.setItem("authToken", token);
  //   localStorage.setItem("asHost", asHost);
  //   this.setState({
  //     authed: true,
  //     asHost,
  //   });
  // };

  // const handleLogOut = () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("asHost");
  //   this.setState({
  //     authed: false,
  //   });
  // };

  const renderContent = () => {
    // if (!this.state.authed) {
    //   return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    // }
    // if (this.state.asHost) {
    //   return <HostHomePage />;
    // }
    // return <GuestHomePage />;
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          Stays Booking
        </div>
        {this.state.authed && (
          <div>
            <Dropdown trigger="click" overlay={userMenu}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        )}
      </Header>
      <Content
        style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
      >
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default App;
