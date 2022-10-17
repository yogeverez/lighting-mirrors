import React, { useState } from "react";
import { Form } from "antd";
import Auth from "../../api/auth";
import FormSteps from "./FormSteps";

const OrderForm = (props) => {
  const { onChange, values } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState(null);

  const onValuesChange = (changedValues, allValues) => {
    onChange(allValues);
    console.log(allValues);
  };

  const addSignature = (data) => {
    setSignature(data);
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
    >
      <FormSteps
        values={values}
        addSignature={addSignature}
        signature={signature}
      />
    </Form>
  );
};

export default OrderForm;
