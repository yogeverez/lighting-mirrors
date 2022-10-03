import React from "react";
import Fade from "react-reveal/Fade";
import { Tab, TabList, TabPanel } from "react-tabs";
import Text from "../../common/components/Text";
import Heading from "../../common/components/Heading";
import Container from "../../common/components/UI/Container";
import Section, { SectionHeading, ReactTabs } from "./shape.style";
import square from "../../common/assets/image/mirrors/19.png";
import horizontal from "../../common/assets/image/mirrors/24.png";
import ellipse from "../../common/assets/image/mirrors/7.png";
import round from "../../common/assets/image/mirrors/1.png";

const Shape = () => {
  const tabs = [
    {
      id: 1,
      title: "מראה מלבנית",
      content: {
        image: square,
      },
    },
    {
      id: 2,
      title: "מראה שכובה",
      content: {
        image: horizontal,
      },
    },
    {
      id: 3,
      title: "מראה אליפטית",
      content: {
        image: ellipse,
      },
    },
    {
      id: 4,
      title: "מראה עגולה",
      content: {
        image: round,
      },
    },
  ];
  const data = {
    sectionTitle: "סוגי מראות",
    sectionDesc:
      "ניתן לבחור את צורת המראה וכן אם הפינות שלה תהיינה ישרות או מעוגלות",
    tabs,
  };

  console.log(data);
  return (
    <Section id="features">
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

export default Shape;
