import React from "react";
import { Form, Row, Col } from "antd";
import FloatingFormActions from "../../common/forms/FloatingFormActions";
import PhoneNumberItem from "../../common/forms/PhoneNumberItem";
import InputItem from "../../common/forms/InputItem";
import SelectItem from "../../common/forms/SelectItem";
import RadioButtonItem from "../../common/forms/RadioButtonItem";
import ResponsiveItemsWrapper from "../../common/components/Layouts/ResponsiveItemsWrapper";
import Spacer from "../../common/components/Layouts/Spacer";

const OrderForm = (props) => {
  const { onChange } = props;
  const [form] = Form.useForm();

  const onValuesChange = (changedValues, allValues) => {
    onChange(allValues);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    //pop error notification
  };

  const onDecline = () => {};

  const onSubmit = (r) => {
    console.log(r);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
      onValuesChange={onValuesChange}
      form={form}
      //   style={{ height: "800px", overflow: "auto" }}
    >
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
              <RadioButtonItem
                name={"lighting"}
                lighting={true}
                required={true}
                label={"סוג תאורה"}
              />
            </div>
            <Spacer horizontal={true} />
            <div style={{ flex: 1 }}>
              <SelectItem
                name={"technology"}
                required={true}
                technology={true}
                label={"טכנולוגיה"}
              />
            </div>
          </ResponsiveItemsWrapper>
        </Col>
      </Row>
      <FloatingFormActions
        resource={"employees"}
        action={"editor"}
        onCancel={onDecline}
        formName={"order"}
        onDecline={onDecline}
        hideDelete={true}
        hideDecline={true}
        // saveLoading={saveLoading}
        saveText={"הזמן"}
        show={true}
      />
    </Form>
  );
};

export default OrderForm;
