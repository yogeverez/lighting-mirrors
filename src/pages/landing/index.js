import React, { Fragment, useState } from "react";
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
import Payments from "../../api/payments";
import { Button } from "antd";
import { getOrderPdf } from "../../common/forms/helpers";
import { GlobalStyle, ContentWrapper } from "../../common/assets/css/app.style";
import Iframe from "react-iframe";

const Landing = () => {
  const [visible, setVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const onShow = () => {
    setVisible(true);
  };

  const onHide = () => {
    setVisible(false);
  };

  const openPayments = async () => {
    const values = {
      width: "40CM",
      height: "40CM",
      shape: "rectangle",
      frame: true,
      lighting: "back",
      style: "JY-S002",
      technology: [
        "Brightness control",
        "Intelligent defogging",
        "Human-body induction",
        "Time / Temperature display",
        "Bluetooth",
      ],
      quantity: 2,
      terms: true,
      first_name: "יוגב",
      surename: "ארז",
      business_name: "ארזים שירותי סיעוד",
      taxId: "511294662",
      city: "גבעת ברנר",
      street: "התאנה",
      house_number: "20",
      apartmant_number: "22",
      floor_number: "22",
      zip: "4234243",
      phone: "+972508698824",
      email: "yogeverez@gmail.com",
      delivery_notes: "אין הערות",
      corners: "straight",
      "frame-color": "black",
    };

    const english = true;
    const hebrew = true;
    getOrderPdf(values, hebrew, english);

    // const res = await Payments.getGreenInvoiceToken();

    // // const res = await Payments.launchPaymentForm();
    // const obj = JSON.parse(res);
    // console.log(res);
    // console.log(obj);

    // setPaymentUrl(obj.url);
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
          <Button onClick={() => openPayments()}>פתח תשלום</Button>

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
