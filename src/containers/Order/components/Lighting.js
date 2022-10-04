import React from "react";
import { Row, Col } from "antd";
import MirrorStyleItem from "../../../common/forms/MirrorStyleItem";
import RadioButtonItem from "../../../common/forms/RadioButtonItem";
import ResponsiveItemsWrapper from "../../../common/components/Layouts/ResponsiveItemsWrapper";
import Spacer from "../../../common/components/Layouts/Spacer";

const Lighting = (props) => {
  const { values } = props;
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <RadioButtonItem
              name={"lighting"}
              lighting={true}
              required={true}
              label={"סוג תאורה"}
            />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}></div>
        </ResponsiveItemsWrapper>

        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <MirrorStyleItem
              name={"style"}
              required={true}
              label={"סגנון המראה"}
              values={values}
            />
          </div>
        </ResponsiveItemsWrapper>
      </Col>
    </Row>
  );
};

export default Lighting;
