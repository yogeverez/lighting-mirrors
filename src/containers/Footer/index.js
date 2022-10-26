import React from "react";
import { Icon } from "react-icons-kit";
// import { useStaticQuery, graphql } from 'gatsby';
import { ic_place } from "react-icons-kit/md/ic_place";
import { ic_phone } from "react-icons-kit/md/ic_phone";
import { paperPlane } from "react-icons-kit/fa/paperPlane";
import Container from "../../common/components/UI/Container";
import Heading from "../../common/components/Heading";
import Image from "../../common/components/Image";
import Text from "../../common/components/Text";
import Link from "../../common/components/Link";
import {
  Section,
  Grid,
  FooterWidget,
  ContactInfo,
  InfoItem,
  FooterBottom,
} from "./footer.style";

const Footer = (props) => {
  const { main } = props;
  const footerTop = {
    widgets: [
      {
        id: 2,
        title: "מדיניות האתר",
        list: [
          {
            id: 1,
            title: "תקנון האתר",
            link: "/terms",
          },
          {
            id: 2,
            title: "מדיניות פרטיות",
            link: "/privacy",
          },
          {
            id: 3,
            title: "מדיניות ביטולים והחזרות",
            link: "/cancellation",
          },
        ],
      },
    ],
    contactInfo: {
      title: "יצירת קשר",
      address: `התאנה 20, גבעת ברנר`,
      phone: `+972 508698824`,
      // openingTime: `7 Days - 8am - 10pm`,
      email: `info@watchmarks.com`,
    },
  };

  const footer = {
    copyright: `Copyright © 2022 Watchmarks. All rights reserved`,
  };

  return (
    <Section style={{ background: main ? "#ffffff" : "#f4f4f4" }}>
      <Container width="1400px">
        <Grid>
          {footerTop.widgets.map((item) => (
            <FooterWidget key={item.id}>
              <h4>{item.title}</h4>
              <ul>
                {item.list.map((item) => (
                  <li className="widgetListItem" key={item.id}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </FooterWidget>
          ))}
          <ContactInfo>
            <Heading as="h4" content={footerTop.contactInfo.title} />
            <InfoItem>
              <Icon icon={ic_place} size={24} />
              <Text content={footerTop.contactInfo.address} />
            </InfoItem>
            <InfoItem>
              <Icon icon={ic_phone} size={26} className="phone-icon" />
              <div>
                <Text
                  className="phone-number"
                  content={footerTop.contactInfo.phone}
                />
                <Text content={footerTop.contactInfo.openingTime} />
              </div>
            </InfoItem>
            <InfoItem>
              <Icon icon={paperPlane} size={22} />
              <Text content={footerTop.contactInfo.email} />
            </InfoItem>
          </ContactInfo>
        </Grid>
      </Container>
      <Container width="1400px">
        <FooterBottom>
          <Text content={footer.copyright} />
        </FooterBottom>
      </Container>
    </Section>
  );
  return;
  <Section />;
};

export default Footer;
