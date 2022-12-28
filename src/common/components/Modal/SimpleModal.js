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
        height: window.innerHeight,
        transform: "translate3d(0, 0, 0)",
        overflow: "hidden",
        background: "#ffffff",
        margin: 0,
        maxWidth: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999,
        padding: 0,
      }}
      bodyStyle={{
        zIndex: 9999,
        boxShadow: "none",
        background: "#ffffff",
        padding: 0,
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
