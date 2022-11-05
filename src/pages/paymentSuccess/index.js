import React, { Fragment, useEffect } from "react";
import { Button, Result } from "antd";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  // const { requestId } = useParams();
  // console.log(requestId);
  // console.log(window.location);
  let params = new URL(document.location).searchParams;
  let requestId = params.get("requestId"); // is the string "Jonathan Smith".
  // let age = parseInt(params.get('age')); // is the number 18

  console.log(requestId);

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
