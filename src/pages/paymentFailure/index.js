import React, { Fragment, useEffect } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import Auth from "../../api/auth";

const PaymentFailure = () => {
  let params = new URL(document.location).searchParams;
  let requestId = params.get("requestId");
  let orderId = params.get("orderId");

  useEffect(() => {
    Auth.updateOrderAfterPayment(orderId, requestId, "failure");
  }, [orderId, requestId]);

  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        <Result
          status="warning"
          title="הייתה בעיה והתשלום לא עבר בהצלחה"
          extra={[
            <Link to="..">
              <Button type="primary" key="buy">
                חזרה למסך הבית
              </Button>
            </Link>,
          ]}
        />
      </Fragment>
    </div>
  );
};
export default PaymentFailure;
