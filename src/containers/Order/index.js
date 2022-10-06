import React, { useState } from "react";
import SimpleModal from "../../common/components/Modal/SimpleModal";
import OrderContent from "./OrderContent";
const Order = (props) => {
  const { visible, onHide } = props;

  return (
    <div>
      <SimpleModal visible={visible} onHide={onHide}>
        <OrderContent />
      </SimpleModal>
    </div>
  );
};

export default Order;
