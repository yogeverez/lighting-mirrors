import React, { useState } from "react";
import { Form } from "antd";
import Auth from "../../api/auth";
import FormSteps from "./FormSteps";
import Payments from "../../api/payments";
import { useNavigate } from "react-router-dom";

const OrderForm = (props) => {
  const { onChange, values } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState(null);
  const navigate = useNavigate();

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
    const values = { ...r, id: order.id };
    const url = await Payments.launchForm(values);
    setLoading(false);
  };

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
