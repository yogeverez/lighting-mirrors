import React, { useState } from "react";
import { Form, Row, Col, Button } from "antd";
import FloatingFormActions from "../../common/forms/FloatingFormActions";
import PhoneNumberItem from "../../common/forms/PhoneNumberItem";
import InputItem from "../../common/forms/InputItem";
import SelectItem from "../../common/forms/SelectItem";
import ArrayRadioButtonItem from "../../common/forms/ArrayRadioButtonItem";
import MirrorStyleItem from "../../common/forms/MirrorStyleItem";
import RadioButtonItem from "../../common/forms/RadioButtonItem";
import ResponsiveItemsWrapper from "../../common/components/Layouts/ResponsiveItemsWrapper";
import Spacer from "../../common/components/Layouts/Spacer";
import Auth from "../../api/auth";
import FormSteps from "./FormSteps";

const OrderForm = (props) => {
  const { onChange, values } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onValuesChange = (changedValues, allValues) => {
    onChange(allValues);
    console.log(allValues);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    //pop error notification
  };

  const onDecline = () => {};

  const onSubmit = async (r) => {
    setLoading(true);
    const order = await Auth.addOrder(r);
    setLoading(false);
  };
  console.log(values);

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
      <FormSteps values={values} />
    </Form>
  );
};

export default OrderForm;

// <Row>
// <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
//   <ResponsiveItemsWrapper>
//     <div style={{ flex: 1 }}>
//       <InputItem name={"name"} required={true} label={"שם מלא"} />
//     </div>
//     <Spacer horizontal={true} />
//     <div style={{ flex: 1 }}>
//       <PhoneNumberItem
//         name={"phone"}
//         required={true}
//         label={"מספר טלפון"}
//       />
//     </div>
//   </ResponsiveItemsWrapper>

//   <ResponsiveItemsWrapper>
//     <div style={{ flex: 1 }}>
//       <SelectItem
//         name={"width"}
//         required={true}
//         width={true}
//         label={"רוחב המראה"}
//       />
//     </div>
//     <Spacer horizontal={true} />
//     <div style={{ flex: 1 }}>
//       <SelectItem
//         name={"height"}
//         required={true}
//         height={true}
//         label={"אורך המראה"}
//       />
//     </div>
//   </ResponsiveItemsWrapper>

//   <ResponsiveItemsWrapper>
//     <div style={{ flex: 1 }}>
//       <SelectItem
//         name={"shape"}
//         required={true}
//         shape={true}
//         label={"צורת המראה"}
//       />
//     </div>
//     <Spacer horizontal={true} />
//     <div style={{ flex: 1 }}>
//       <RadioButtonItem
//         name={"corners"}
//         corners={true}
//         required={true}
//         label={"פינות"}
//       />
//     </div>
//   </ResponsiveItemsWrapper>

//   <ResponsiveItemsWrapper>
//     <div style={{ flex: 1 }}>
//       <RadioButtonItem
//         name={"frame"}
//         frame={true}
//         required={true}
//         label={"מסגרת"}
//       />
//     </div>
//     <Spacer horizontal={true} />
//     <div style={{ flex: 1 }}>
//       <SelectItem
//         name={"frame-color"}
//         required={true}
//         frameColor={true}
//         label={"צבע המסגרת"}
//       />
//     </div>
//   </ResponsiveItemsWrapper>

//   <ResponsiveItemsWrapper>
//     <div style={{ flex: 1 }}>
//       <RadioButtonItem
//         name={"lighting"}
//         lighting={true}
//         required={true}
//         label={"סוג תאורה"}
//       />
//     </div>
//     <Spacer horizontal={true} />
//     <div style={{ flex: 1 }}></div>
//   </ResponsiveItemsWrapper>
//   <ResponsiveItemsWrapper>
//     <div style={{ flex: 1 }}>
//       <ArrayRadioButtonItem
//         name={"technology"}
//         required={true}
//         technology={true}
//         label={"טכנולוגיה"}
//       />
//     </div>
//   </ResponsiveItemsWrapper>
//   <ResponsiveItemsWrapper>
//     <div style={{ flex: 1 }}>
//       <MirrorStyleItem
//         name={"style"}
//         required={true}
//         label={"סגנון המראה"}
//         values={values}
//       />
//     </div>
//   </ResponsiveItemsWrapper>
// </Col>
// </Row>
{
  /* <div style={{ display: "flex", alignItems: "center", padding: "0 20%" }}>
<Button type="primary" htmlType="submit" block loading={loading}>
  הזמן
</Button>
</div> */
}
