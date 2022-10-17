import React, { useState } from "react";
import Section, { OrderContentWrapper, Content } from "./order.style";
import OrderForm from "./OrderForm";

const OrderContent = () => {
  const [values, setValues] = useState({});

  const onChange = (val) => {
    setValues(val);
  };

  return (
    <Section id="home">
      <Content>
        <OrderForm onChange={onChange} values={values} />
      </Content>
    </Section>
  );
};

export default OrderContent;
