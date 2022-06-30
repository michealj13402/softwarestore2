import { Button, Modal } from "antd";
import { useState } from "react";

const SignupButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegisterOnClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
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
      >
        hello
      </Modal>
    </>
  );
};

export default SignupButton;
