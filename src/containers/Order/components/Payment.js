import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import Iframe from "react-iframe";
import { useMediaQuery } from "react-responsive";
const Payment = (props) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 470px)" });
  const { values, paymentUrl } = props;
  return (
    <Row>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
        xxl={24}
        style={{
          display: isBigScreen ? "flex" : "initial",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {paymentUrl && (
          <Iframe
            url={paymentUrl}
            width={isBigScreen ? "450px" : window.innerWidth - 70}
            styles={{
              background: "#ffffff",
              zIndex: 99999,
              paddingTop: isBigScreen ? "40px" : "0px",
              borderWidth: 0,
            }}
            className=""
            display="block"
          />
        )}
      </Col>
    </Row>
  );
};

export default Payment;
