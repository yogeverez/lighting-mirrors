import React from "react";
import { Layout, Modal, Tooltip, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Surface from "../Layouts/Surface";

const FullScreenModal = (props) => {
  const { visible, onHide, children } = props;

  const closeModal = () => {
    console.log("hide");
    onHide();
  };
  return (
    <Modal
      width={"vw"}
      style={{
        height: "100vh",
        maxWidth: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
      bodyStyle={{
        height: "100vh",
        width: "100vw",
        background: "#f3f6f8",
        padding: "0px 0 0 0",
        // padding: "20px",
        zIndex: 9999,
      }}
      closable={false}
      open={visible}
      footer={null}
      destroyOnClose={true}
    >
      <Layout style={{ background: "transparent" }}>
        <Tooltip title="close">
          <Button
            onClick={closeModal}
            size="large"
            style={{ position: "absolute", right: 30, top: 30, zIndex: 999999 }}
            shape="circle"
            icon={<CloseOutlined />}
          />
        </Tooltip>
        <Surface>{children}</Surface>
      </Layout>
    </Modal>
  );
};

export default FullScreenModal;
