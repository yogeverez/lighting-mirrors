import React, { useState } from "react";
import FullScreenModal from "../../common/components/Modal/FullScreenModal";
import OrderContent from "./OrderContent";
const Order = (props) => {
  const { visible, onHide } = props;

  return (
    <div>
      <FullScreenModal visible={visible} onHide={onHide}>
        <OrderContent />
      </FullScreenModal>
    </div>
  );
};

export default Order;
