import React, { Fragment } from "react";
import { ResetCSS } from "../../common/assets/css/style";
import Footer from "../../containers/Footer";
import Privacy from "../../containers/Privacy";
import { GlobalStyle, ContentWrapper } from "../../common/assets/css/app.style";

const Terms = () => {
  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Privacy />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </div>
  );
};
export default Terms;
