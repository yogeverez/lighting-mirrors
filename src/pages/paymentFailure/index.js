import React, { Fragment, useState } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PaymentFailure = () => {
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
