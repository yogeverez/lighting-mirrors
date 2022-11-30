import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import { Icon } from "react-icons-kit";
import { mediaRecordOutline } from "react-icons-kit/typicons";
import { plus } from "react-icons-kit/typicons";
import { starOutline } from "react-icons-kit/typicons";
import Text from "../../common/components/Text";
import Heading from "../../common/components/Heading";
import Image from "../../common/components/Image";
import Container from "../../common/components/UI/Container";
import FeatureBlock from "../../common/components/FeatureBlock";
import SectionWrapper, {
  FeatureWrapper,
  SectionHeader,
} from "./features.style";
import featureIcon1 from "../../common/assets/image/icons/3light.png";
import featureIcon2 from "../../common/assets/image/icons/drag.png";
import featureIcon3 from "../../common/assets/image/icons/heater.png";
import featureIcon4 from "../../common/assets/image/icons/sensor.png";
import featureIcon5 from "../../common/assets/image/icons/temperature.png";
import featureIcon6 from "../../common/assets/image/icons/bluetooth.png";

const Technology = () => {
  const features = {
    title: "טכנולוגייה",
    slogan:
      "ניתן לאבזר את המראה בפיצ׳רים רבים, החל מחיישן חום או חיישן המפעיל את המראה רק כשמזהה אדם מולה ועד התקן בלוטוס המאפשר התחברות למראה והשמעת מוזיקה",
    items: [
      {
        id: 1,
        icon: featureIcon1,
        bg: "#F9F1FA",
        title: "שלושה סוגי תאורה",
        description:
          "מתג ברירה בין 3 סוגי תאורה, לקבלת תאורה חמה, טבעית או קרה",
      },
      {
        id: 2,
        icon: featureIcon2,
        bg: "#e6fff3",
        title: "שליטה על עוצמת תאורה",
        description:
          "לחיצה ארוכה תקטין או תגדיל את עוצמת התאורה עד לקבלת העוצמה הרצויה",
      },
      {
        id: 3,
        icon: featureIcon3,
        title: "הפשרת אדים",
        bg: "#fff9dc",
        description:
          "הסוף לאדים בזמן המקלחת. תוכלו לראות את עצמכם בצורה חלקה גם בחדר אפוף אדים",
      },
      {
        id: 4,
        icon: featureIcon4,
        title: "חיישן קירבה",
        bg: "#e3f2ff",
        description:
          "המראה תידלק באופן אוטומטי כאשר תזהה אדם בקרבה של 50 סנטימטרים מהמראה",
      },
      {
        id: 5,
        icon: featureIcon5,
        bg: "#ffefee",
        title: "תצוגת טמפרטורה וזמן",
        description: "תוכלו לדעת מה הטמפרטורה בחדר ומה הזמן בכל רגע נתון",
      },
      {
        id: 6,
        icon: featureIcon6,
        bg: "#efebff",
        title: "התקן בלוטוס",
        description:
          "התחברו עם הטלפון שלכם או עם כל מכשיר תומך בלוטוס למראה, והשמיעו מוזיקה בזמן המקלחת",
      },
    ],
  };

  const { slogan, title, items } = features;

  return (
    <SectionWrapper id="technology">
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading content={title} />
            <Text content={slogan} />
          </Fade>
        </SectionHeader>
        <FeatureWrapper>
          {items.map((item) => (
            <Fade up delay={100 * item.id} key={`feature-key${item.id}`}>
              <FeatureBlock
                style={{ "--color": `${item.color}` }}
                icon={
                  <Fragment>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: item.bg,
                        borderRadius: "20px",
                        height: "60px",
                        width: "60px",
                      }}
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        style={{
                          // display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                          // background: item.bg,
                          // borderRadius: "20px",
                          // height: "60px",
                          width: "40px",
                          height: "auto",
                        }}
                      />
                    </div>
                  </Fragment>
                }
                iconPosition="left"
                title={<Heading as="h3" content={item.title} />}
                description={<Text content={item.description} />}
              />
            </Fade>
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Technology;
