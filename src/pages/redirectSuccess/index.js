import React, { Fragment, useEffect } from "react";
import { Spin } from "antd";

const RedirectSuccess = () => {
  useEffect(() => {
    var pathname = window.location.href.replace(
      "transactionsuccess",
      "payment-success"
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
export default RedirectSuccess;
