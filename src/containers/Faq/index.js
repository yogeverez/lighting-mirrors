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
          title: "מדוע יש צורך במראה חכמה בהתאמה אישית?",
          description:
            "הכל התחיל בצורך שהתעורר אצלנו למצוא מראה בהתאמה אישית שתענה על הדרישות שלנו. רצינו מראה שתהיה אסתטית ונעימה לעין וגם חכמה. רצינו לעצבה לפי מידות חדר הרחצה ובמחיר סביר. ביצענו סקר שוק מקיף מאוד ולא מצאנו מראה שתענה על כל הדרישות שלנו. אז החלטנו לקחת את המושכות לידיים ולהתחיל לייצר ולעזור גם לכם ליצור את המראה שדמיינתם ,לפי הדרישות שלכם, במחיר סביר ולהביאה עד לדלת ביתכם.",
        },
        {
          id: 2,
          title: "מה היתרונות של המראה?",
          description:
            "אנחנו יודעים לייצר עבורכם מראה מוארת וחכמה המיוצרת בהתאם לדרישות הייחודיות שלכם. אתם שולטים על גודל המראה, הצבע שלה, צורת וצבע המסגרת, סוג וצבע התאורה, סוג הטכנולוגיה שתוטמע במראה (אלו פיצ׳רים יתווספו למראה), והכל בהתאם לצרכים האישיים שלכם.",
        },
        {
          id: 3,
          title: "מה זו מראה חכמה?",
          description:
            "למראות החכמות שלנו ניתן להוסיף פיצ'רים רבים: חיישן קרבה - חיישן המפעיל את המראה כאשר היא מזהה אדם מולה בקרבה של 50 סנטימטרים. התקן בלוטוס המאפשר התחברות למראה והשמעת מוזיקה. מתג בחירת סוגי תאורה - חמה/קרה וטבעית. אתם יכולים לשלוט גם בעוצמת התאורה, לחיצה ארוכה תקטין או תגדיל את עוצמת התאורה עד לקבלת העוצמה הרצויה. הפשרת אדים - הסוף לאדים בזמן המקלחת. תוכלו לראות את עצמכם בצורה חלקה גם בחדר אפוף אדים. תצוגת טמפרטורה וזמן.",
        },
        {
          id: 4,
          title: "איך מבצעים הזמנה באתר?",
          description:
            "בדף הראשי ישנו כפתור בצידו השמאלי העליון הנקרא - הזמן מראה בהתאמה אישית שדרכו מבצעים את הזמנת המראות. יש למלא את פרטי המזמין, את נתוני המראה - רוחב, אורך, צורה, פינות, מסגרת, צבע מסגרת, סוג טכנולוגיה וסוג תאורה .לאחר שתמלאו את כל הפרטים תגיעו לדף מסכם עם כל פרטי המראה כולל העלות. תחתמו כי אתם מאשרים את פרטי ההזמנה והמראות יהיו בדרך אליכם.",
        },
        {
          id: 5,
          title: "יש לי התלבטות לגבי איזו מידה להזמין?",
          description:
            "בבחירה של מראה לחדר האמבטיה חשוב לבצע את כל המדידות בטרם רכישת המראה. יש לבדוק מהו השטח העומד לרשותכם. כדאי למדוד לא רק את השטח על הקיר, אלא גם את גודלם של אביזרים המוצבים בסביבת המראה, למשל ארונות האמבטיה. המטרה היא ליצור מראה פרופורציונלי, מאוזן ונאה. במידה והמראה מוצבת בחדר הרחצה, רצוי כי שטחה לא יחרוג משטח ארונות האמבטיה. במידה וישנם שני כיורים, יש לקחת בחשבון שיקול נוסף והוא האם לתלות מראה בודדת או שתי מראות המוצבות מעל כל כיור בנפרד. את המראה יש למקם בגובה המותאם לגובה המשתמשים בה.",
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
