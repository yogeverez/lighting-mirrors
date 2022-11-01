import React, { Fragment, useState } from "react";
import Iframe from "react-iframe";
import { useMediaQuery } from "react-responsive";

const Payment = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 470px)" });

  const [paymentUrl, setPaymentUrl] = useState(
    "https://sandbox.payme.io/sale/generate/SALE1667-228660MO-PWZL6UDC-BLTCFI3F"
  );

  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        {paymentUrl && (
          <Iframe
            url={paymentUrl}
            width={isBigScreen ? "450px" : window.innerWidth - 40}
            height={isBigScreen ? "450px" : "700px"}
            styles={{
              top: "40px",
              right: isBigScreen ? (window.innerWidth - 450) / 2 : 20,
              background: "#ffffff",
              zIndex: 99999,
            }}
            className=""
            display="block"
            top
            position="absolute"
          />
        )}
      </Fragment>
    </div>
  );
};
export default Payment;
