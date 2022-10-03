import React, { useState, Fragment } from "react";
import Heading from "../../common/components/Heading";
import Container from "../../common/components/UI/Container";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/entypo";
import { minus } from "react-icons-kit/entypo";
import Section, { SectionHeading, RcCollapse } from "./faq.style";
import { Panel } from "rc-collapse";
import motion from "./motion-util";

import "../../common/assets/css/rc-collapse.css";
import "rc-collapse/assets/index.css";

const Faq = () => {
  const [activeKey, setActiveKey] = useState(1);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const data = {
    webAppCreativeJson: {
      faqs: [
        {
          id: 1,
          title: "01. What is the process of project final delivery system?",
          description:
            "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat. We try to reply quickly, so you need not to wait too long for a response!.",
        },
        {
          id: 2,
          title: "02. What is payment process, believe in upfront?",
          description:
            "Please read the documentation carefully. We also have some online  video tutorials regarding this issue. If the problem remains, Please Open a ticket in the support forum.",
        },
        {
          id: 3,
          title: "03. What is the process of project final delivery system?",
          description:
            "At first, Please check your internet connection. We also have some online  video tutorials regarding this issue. If the problem remains, Please Open a ticket in the support forum.",
        },
        {
          id: 4,
          title: "04. Estimate project budget for categories?",
          description:
            "Our core members created this place for Designers, Developers, Product Owners, Marketing Managers, startup's, Freelancers and really for everyone who appreciates fine designs and well-crafted sites. We want to inspire and support you in the process of creating your own unique website projects.",
        },
        {
          id: 5,
          title: "05. All about project customization & monetization",
          description:
            "We are giving the update of this theme continuously. You will receive an email Notification when we push an update. Always try to be updated with us.",
        },
      ],
    },
  };

  return (
    <Section id="faq">
      <Container className="container">
        <SectionHeading>
          <Heading content="שאלות תכופות" />
        </SectionHeading>
        <RcCollapse
          collapsible={undefined}
          accordion={true}
          activeKey={activeKey}
          onChange={onChange}
          openMotion={motion}
        >
          {data.webAppCreativeJson.faqs?.map((faq) => (
            <Panel
              key={faq.id}
              showArrow={false}
              header={
                <Fragment>
                  <Heading as="h4" content={faq.title} />
                  <span className="icon">
                    <Icon icon={minus} size={20} className="minus" />
                    <Icon icon={plus} size={20} className="plus" />
                  </span>
                </Fragment>
              }
            >
              {faq.description}
            </Panel>
          ))}
        </RcCollapse>
      </Container>
    </Section>
  );
};

export default Faq;
