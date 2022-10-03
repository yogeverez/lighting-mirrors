import React from "react";
import Container from "../../common/components/UI/Container";
import Heading from "../../common/components/Heading";
import Text from "../../common/components/Text";
import GatsbyImage from "../../common/components/GatsbyImage";
import Section, {
  BannerContentWrapper,
  BannerContent,
  Subscribe,
  Figure,
} from "./banner.style";
import dashboard from "../../common/assets/image/mirrors/front.png";

const Banner = () => {
  return (
    <Section id="home">
      <Container width="1400px">
        <BannerContentWrapper>
          <BannerContent>
            <Heading
              className="animate__animated animate__fadeInUp"
              content="מראות מוארות וחכמות בהתאמה אישית"
            />
            <Text
              className="animate__animated animate__fadeInUp"
              content="מראות מוארות וחכמות, המיוצרות בהתאם לדרישות הייחודיות שלכם. ניתן לשלוט על הצורה, הגודל, התאורה ואפילו על הטכנולוגייה שתותקן על המראה שלכם"
            />
            {/* <Subscribe className="animate__animated animate__fadeInUp">
              <Input
                inputType="email"
                placeholder="Your work email"
                iconPosition="left"
                aria-label="email"
                icon={<Image src={envelope} alt="envelope" />}
              />
              <Button title="Get a demo" type="submit" />
            </Subscribe> */}
          </BannerContent>
          <Figure className="animate__animated animate__fadeInUp animate__fast">
            <GatsbyImage src={dashboard} alt="dashboard" />
          </Figure>
        </BannerContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
