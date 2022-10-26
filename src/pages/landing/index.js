import React, { Fragment, useState } from "react";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { DrawerProvider } from "../../common/contexts/DrawerContext";
import { ResetCSS } from "../../common/assets/css/style";
import Navbar from "../../containers/Navbar";
import Banner from "../../containers/Banner";
import HowItWorks from "../../containers/HowItWorks";
import Shape from "../../containers/Shape";
import Lightning from "../../containers/Lightning";
import Faq from "../../containers/Faq";
import Technology from "../../containers/Technology";
import Footer from "../../containers/Footer";
import Order from "../../containers/Order";
import { theme } from "../../common/theme";

import { GlobalStyle, ContentWrapper } from "../../common/assets/css/app.style";

const Landing = () => {
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
  };

  const onHide = () => {
    setVisible(false);
  };

  return (
    <div>
      <Fragment style={{ zIndex: 100 }}>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar onShow={onShow} />
            </DrawerProvider>
          </Sticky>
          <Banner />
          <HowItWorks />
          <Shape />
          <Technology />
          <Lightning />
          <Faq />
          <Footer main={true} />
        </ContentWrapper>
        <Order onHide={onHide} visible={visible} />
      </Fragment>
    </div>
  );
};
export default Landing;
