import React, { useState } from "react";
import { Form, Row, Col, Button } from "antd";
import PhoneNumberItem from "../../../common/forms/PhoneNumberItem";
import InputItem from "../../../common/forms/InputItem";
import ResponsiveItemsWrapper from "../../../common/components/Layouts/ResponsiveItemsWrapper";
import Spacer from "../../../common/components/Layouts/Spacer";
import Auth from "../../../api/auth";

const PersonalDetails = (props) => {
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <InputItem name={"name"} required={true} label={"שם מלא"} />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <PhoneNumberItem
              name={"phone"}
              required={true}
              label={"מספר טלפון"}
            />
          </div>
        </ResponsiveItemsWrapper>
      </Col>
    </Row>
  );
};

export default PersonalDetails;
