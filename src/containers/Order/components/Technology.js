import React from "react";
import { Row, Col } from "antd";
import ArrayRadioButtonItem from "../../../common/forms/ArrayRadioButtonItem";
import ResponsiveItemsWrapper from "../../../common/components/Layouts/ResponsiveItemsWrapper";

const Technology = (props) => {
  const { values } = props;
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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

export default Technology;
