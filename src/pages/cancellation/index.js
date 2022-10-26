import React, { Fragment, useState } from "react";
import { ResetCSS } from "../../common/assets/css/style";
import Footer from "../../containers/Footer";
import CancellationTerms from "../../containers/CancellationTerms";
import { GlobalStyle, ContentWrapper } from "../../common/assets/css/app.style";

const Cancellation = () => {
  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <CancellationTerms />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </div>
  );
};
export default Cancellation;
