import React, { useState } from "react";
import Section, { OrderContentWrapper, Content } from "./order.style";
import OrderForm from "./OrderForm";
import { useMediaQuery } from "react-responsive";

const OrderContent = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 991px)" });
  const [values, setValues] = useState({});

  const contentHeight = isBigScreen
    ? `${window.innerHeight - 270}px`
    : "inherit";

  const onChange = (val) => {
    setValues(val);
  };

  return (
    <Section id="home">
      <Content contentHeight={contentHeight} isBigScreen={isBigScreen}>
        <OrderForm onChange={onChange} values={values} />
      </Content>
    </Section>
  );
};

export default OrderContent;
