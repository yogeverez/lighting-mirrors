import React, { Fragment, useEffect } from "react";
import { Button, Result } from "antd";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  let params = useParams();
  console.log(params);

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
