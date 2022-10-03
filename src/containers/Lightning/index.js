import React from "react";
import Fade from "react-reveal/Fade";
import { Tab, TabList, TabPanel } from "react-tabs";
import Text from "../../common/components/Text";
import Heading from "../../common/components/Heading";
import Container from "../../common/components/UI/Container";
import Section, { SectionHeading, ReactTabs } from "./lightning.style";
import front from "../../common/assets/image/mirrors/8.png";
import back from "../../common/assets/image/mirrors/10.png";

const Lightning = () => {
  const tabs = [
    {
      id: 1,
      title: "תאורה קדמית",
      content: {
        image: front,
      },
    },
    {
      id: 2,
      title: "תאורה אחורית",
      content: {
        image: back,
      },
    },
  ];
  const data = {
    sectionTitle: "סוגי תאורה",
    sectionDesc: "ניתן לבחור בין תאורה קדמית לאחורית",
    tabs,
  };

  return (
    <Section id="ligthing">
      <Container width="1400px">
        <SectionHeading>
          <Heading content={data.sectionTitle} />
          <Text content={data.sectionDesc} />
        </SectionHeading>
        <ReactTabs>
          <nav>
            <TabList>
              {data.tabs.map((tab) => (
                <Tab key={tab.id}>{tab.title}</Tab>
              ))}
            </TabList>
          </nav>

          {data.tabs.map((tab) => (
            <TabPanel key={tab.id}>
              <Fade up>
                <figure
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "500px",
                  }}
                >
                  <img
                    src={tab.content.image}
                    alt={tab.title}
                    style={{ height: "100%" }}
                  />
                  {/* <Image   /> */}
                </figure>
              </Fade>
            </TabPanel>
          ))}
        </ReactTabs>
      </Container>
    </Section>
  );
};

export default Lightning;
