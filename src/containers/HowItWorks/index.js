import React from "react";
import { Icon } from "react-icons-kit";
import { arrowRight } from "react-icons-kit/feather/arrowRight";
import Container from "../../common/components/UI/Container";
import Image from "../../common/components/Image";
import Link from "../../common/components/Link";
import Heading from "../../common/components/Heading";
import Text from "../../common/components/Text";
import Section, { SectionHeading, Grid, Item } from "./howItWorks.style";
import icon1 from "../../common/assets/image/icons/size.png";
import icon2 from "../../common/assets/image/icons/display-frame.png";
import icon3 from "../../common/assets/image/icons/lamp.png";
import icon4 from "../../common/assets/image/icons/smartphone.png";
const HowItWorks = () => {
  const howTos = [
    {
      id: 1,
      icon: icon1,
      title: "בחר גודל וצורה",
      text: "ניתן לבחור מראות בגדלים משתנים בהתאם לצרכים שלך",
      linkLabel: "Learn More",
      bg: "#EDF6FC",
      link: "#",
    },
    {
      id: 2,
      icon: icon2,
      title: "בחר מסגרת",
      text: "ניתן לבחור למססרת גם צבע וגם האם הפינות יהיו מעוגלות או ישרות",
      linkLabel: "Learn More",
      bg: "#E3FFF2",
      link: "#",
    },
    {
      id: 3,
      icon: icon3,
      title: "בחר סוג תאורה",
      text: `ניתן לבחור בין תאורה קדמית לתאורה אחורית`,
      linkLabel: "Learn More",
      bg: "#F9F1FA",
      link: "#",
    },
    {
      id: 4,
      icon: icon4,
      title: "בחר טכנולוגייה",
      text: `המראה החכמה שלכם יכולה לשלב פיצ׳רים שונים בהתאם לצרכים שלכם`,
      linkLabel: "Learn More",
      bg: "#FFEFEE",
      link: "#",
    },
  ];

  return (
    <Section id="how-to">
      <Container width="1400px">
        <SectionHeading>
          <Heading content="כיצד זה עובד?" />
        </SectionHeading>
        <Grid>
          {howTos.map((howTo) => (
            <Item key={howTo.id}>
              <figure
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: howTo.bg,
                    borderRadius: "20px",
                    height: "85px",
                    width: "85px",
                  }}
                >
                  <Image
                    src={howTo.icon}
                    alt="icon"
                    style={{ height: "60px" }}
                  />
                </div>
              </figure>
              <Heading as="h4" content={howTo.title} />
              <Text content={howTo.text} />
            </Item>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default HowItWorks;
