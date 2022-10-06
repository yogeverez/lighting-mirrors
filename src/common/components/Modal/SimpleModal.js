import React from "react";
import { Modal } from "antd";
import { useMediaQuery } from "react-responsive";

const SimpleModal = (props) => {
  const { visible, onHide, children } = props;
  const isBigScreen = useMediaQuery({ query: "(min-width: 670px)" });

  const closeModal = () => {
    onHide();
  };

  return (
    <Modal
      centered
      width={isBigScreen ? "670px" : "vw"}
      style={{
        margin: "0 10px",
      }}
      bodyStyle={{
        zIndex: 9999,
      }}
      open={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={closeModal}
    >
      <div>{children}</div>
    </Modal>
  );
};

export default SimpleModal;
