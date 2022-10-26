import React, { Fragment, useState } from "react";
import { ResetCSS } from "../../common/assets/css/style";
import Footer from "../../containers/Footer";
import TermsAndConditions from "../../containers/Terms";
import { GlobalStyle, ContentWrapper } from "../../common/assets/css/app.style";

const Terms = () => {
  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <TermsAndConditions />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </div>
  );
};
export default Terms;
