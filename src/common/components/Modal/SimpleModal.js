import React from "react";
import { Modal } from "antd";
import { useMediaQuery } from "react-responsive";
import { flex } from "styled-system";

const SimpleModal = (props) => {
  const { visible, onHide, children } = props;
  const isBigScreen = useMediaQuery({ query: "(min-width: 670px)" });

  const closeModal = () => {
    onHide();
  };

  return (
    <Modal
      className="modalStyle"
      width={"100vw"}
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        margin: 0,
        maxWidth: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
      bodyStyle={{
        zIndex: 9999,
        boxShadow: "none",
      }}
      open={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={closeModal}
    >
      <div className="modal-inner">{children}</div>
    </Modal>
  );
};

export default SimpleModal;
