import React from "react";
import { Icon } from "react-icons-kit";
import { arrowRight } from "react-icons-kit/feather/arrowRight";
import Container from "../../common/components/UI/Container";
import Image from "../../common/components/Image";
import Link from "../../common/components/Link";
import Heading from "../../common/components/Heading";
import Text from "../../common/components/Text";
import Section, { SectionHeading, Grid, Item } from "./howItWorks.style";
import icon1 from "../../common/assets/image/icons/1.png";
import icon2 from "../../common/assets/image/icons/2.png";
import icon3 from "../../common/assets/image/icons/3.png";
import icon4 from "../../common/assets/image/icons/4.png";
const HowItWorks = () => {
  const howTos = [
    {
      id: 1,
      icon: icon1,
      title: "בחר גודל וצורה",
      text: "ניתן לבחור מראות בגדלים משתנים בהתאם לצרכים שלך",
      linkLabel: "Learn More",
      link: "#",
    },
    {
      id: 2,
      icon: icon2,
      title: "בחר מסגרת",
      text: "ניתן לבחור למססרת גם צבע וגם האם הפינות יהיו מעוגלות או ישרות",
      linkLabel: "Learn More",
      link: "#",
    },
    {
      id: 3,
      icon: icon3,
      title: "בחר סוג תאורה",
      text: `ניתן לבחור בין תאורה קדמית לתאורה אחורית`,
      linkLabel: "Learn More",
      link: "#",
    },
    {
      id: 4,
      icon: icon4,
      title: "בחר טכנולוגייה",
      text: `המראה החכמה שלכם יכולה לשלב פיצ׳רים שונים בהתאם לצרכים שלכם`,
      linkLabel: "Learn More",
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
              <figure>
                <Image src={howTo.icon} alt="icon" />
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
