import React, { useState } from "react";
import { Form, Modal } from "antd";
import Auth from "../../api/auth";
import FormSteps from "./FormSteps";
import Payments from "../../api/payments";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

const OrderForm = (props) => {
  const { onChange, values } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [modal, contextHolder] = Modal.useModal();

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
    const finalValues = { ...values, signature, price: 2500 };
    const order = await Auth.addOrder(finalValues);
    await Auth.uploadOrderPdfs({ ...finalValues, orderId: order.id });
    setLoading(false);

    modal.confirm({
      title: "נוצרה הזמנה חדשה",
      icon: <CheckCircleOutlined />,
      content: (
        <div>
          <p>{`הזמנה חדשה נשלחה למייל ${values.email}`}</p>
          <p>
            {
              "במידה וההזמנה נכונה ותואמת את הדרישות שלך, ניתן להמשיך לדף התשלום."
            }
          </p>
        </div>
      ),
      onOk() {
        return onConfirm({ ...finalValues, orderId: order.id });
      },
      onCancel() {},
      okText: "המשך לדף התשלום",
      cancelText: "שנה את ההזמנה",
    });
  };

  const onConfirm = async (values) => {
    const successUrl = `${window.location.origin}/transactionsuccess?orderId=values.orderId`;
    const failureUrl = `${window.location.origin}/transactionfailure?orderId=values.orderId`;
    const url = await Payments.launchForm({
      ...values,
      id: values.orderId,
      successUrl,
      failureUrl,
    });
    console.log(url);
    return setPaymentUrl(url);
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
};

export default OrderForm;
