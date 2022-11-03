import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import Iframe from "react-iframe";
import { useMediaQuery } from "react-responsive";
const Payment = (props) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 470px)" });
  const { values, paymentUrl } = props;
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        {paymentUrl && (
          <Iframe
            url={paymentUrl}
            width={isBigScreen ? "450px" : window.innerWidth - 40}
            height={isBigScreen ? "450px" : "700px"}
            styles={{
              top: "40px",
              right: isBigScreen ? (window.innerWidth - 450) / 2 : 20,
              background: "#ffffff",
              zIndex: 99999,
            }}
            className=""
            display="block"
            top
            position="absolute"
          />
        )}
      </Col>
    </Row>
  );
};

export default Payment;
