import React, { useState } from "react";
import Heading from "../../common/components/Heading";
import ResponsiveItemsWrapper from "../../common/components/Layouts/ResponsiveItemsWrapper";
import Spacer from "../../common/components/Layouts/Spacer";
import Section, { OrderContentWrapper, Content } from "./order.style";
import OrderForm from "./OrderForm";
import MirrorDemo from "./MirrorDemo";

const OrderContent = () => {
  const [values, setValues] = useState({});

  const onChange = (val) => {
    setValues(val);
  };

  return (
    <Section id="home">
      <Content>
        <Heading
          className="animate__animated animate__fadeInUp"
          content="הזמנת מראה בהתאמה אישית"
        />
        <ResponsiveItemsWrapper
          overflow={true}
          height={window.innerHeight - 160}
        >
          <div style={{ flex: 1 }}>
            <OrderForm onChange={onChange} />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <MirrorDemo values={values} />
          </div>
        </ResponsiveItemsWrapper>
      </Content>
    </Section>
  );
};

export default OrderContent;
