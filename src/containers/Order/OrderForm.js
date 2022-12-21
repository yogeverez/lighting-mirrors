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
  const [paymentUrl, setPaymentUrl] = useState(null);

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
    let values = { ...r };
    Object.keys(values).forEach((key) =>
      values[key] === undefined ? delete values[key] : {}
    );
    const order = await Auth.addOrder({ ...values, signature });
    const successUrl = `${window.location.origin}/transactionsuccess`;
    const failureUrl = `${window.location.origin}/transactionfailure`;
    console.log(order.id);
    const url = await Payments.launchForm({
      ...values,
      id: order.id.toString(),
      successUrl,
      failureUrl,
    });
    setPaymentUrl(url);
    console.log(url);
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
        loading={loading}
        paymentUrl={paymentUrl}
      />
    </Form>
  );
};

export default OrderForm;
