import React, { Fragment, useEffect } from "react";
import { Button, Result } from "antd";
import { Link, useParams } from "react-router-dom";
import Auth from "../../api/auth";

const PaymentSuccess = () => {
  let params = new URL(document.location).searchParams;
  let requestId = params.get("requestId");
  let orderId = params.get("orderId");

  useEffect(() => {
    Auth.updateOrderAfterPayment(orderId, requestId, "success");
  }, [orderId, requestId]);

  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        <Result
          status="success"
          title="התשלום עבר בהצלחה"
          subTitle="אישור על ההזמנה וחשבונית נשלחו לכתובת הדואר האלקטרוני שסיפקת"
          extra={[
            <Link to="..">
              <Button type="primary" key="buy">
                רכישת מראה נוספת
              </Button>
            </Link>,
          ]}
        />
      </Fragment>
    </div>
  );
};
export default PaymentSuccess;
