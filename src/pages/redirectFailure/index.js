import React, { Fragment, useEffect } from "react";
import { Spin } from "antd";

const RedirectFailure = () => {
  useEffect(() => {
    var pathname = window.location.href.replace(
      "transactionfailure",
      "payment-failure"
    );

    if (window.self !== window.top) {
      // checking if it is an iframe
      window.parent.location.href = pathname;
    } else {
      window.location.href = pathname;
    }
  }, []);

  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        <Spin />
      </Fragment>
    </div>
  );
};
export default RedirectFailure;
