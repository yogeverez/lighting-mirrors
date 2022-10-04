import React, { useState } from "react";
import { Form, Row, Col, Button } from "antd";
import SelectItem from "../../../common/forms/SelectItem";
import RadioButtonItem from "../../../common/forms/RadioButtonItem";
import ArrayRadioButtonItem from "../../../common/forms/ArrayRadioButtonItem";
import ResponsiveItemsWrapper from "../../../common/components/Layouts/ResponsiveItemsWrapper";
import Spacer from "../../../common/components/Layouts/Spacer";
import Auth from "../../../api/auth";

const Specifications = (props) => {
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <SelectItem
              name={"width"}
              required={true}
              width={true}
              label={"רוחב המראה"}
            />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <SelectItem
              name={"height"}
              required={true}
              height={true}
              label={"אורך המראה"}
            />
          </div>
        </ResponsiveItemsWrapper>

        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <SelectItem
              name={"shape"}
              required={true}
              shape={true}
              label={"צורת המראה"}
            />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <RadioButtonItem
              name={"corners"}
              corners={true}
              required={true}
              label={"פינות"}
            />
          </div>
        </ResponsiveItemsWrapper>

        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <RadioButtonItem
              name={"frame"}
              frame={true}
              required={true}
              label={"מסגרת"}
            />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <SelectItem
              name={"frame-color"}
              required={true}
              frameColor={true}
              label={"צבע המסגרת"}
            />
          </div>
        </ResponsiveItemsWrapper>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <ArrayRadioButtonItem
              name={"technology"}
              required={true}
              technology={true}
              label={"טכנולוגיה"}
            />
          </div>
        </ResponsiveItemsWrapper>
      </Col>
    </Row>
  );
};

export default Specifications;
