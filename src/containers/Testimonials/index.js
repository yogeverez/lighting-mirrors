import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
import Container from '../../common/components/UI/Container';
import Image from '../../common/components/Image';
import Heading from '../../common/components/Heading';
import Text from '../../common/components/Text';
import Section, {
  SectionHeading,
  ReactSlick,
  Item,
  AuthorInfo,
} from './testimonials.style';
import '../../common/assets/css/react-slick.css';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonials = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     webAppCreativeJson {
  //       testimonials {
  //         id
  //         logo {
  //           publicURL
  //         }
  //         author
  //         designation
  //         quote
  //       }
  //     }
  //   }
  // `);
  const data = [];
  return (
    <Section id="testimonial">
      <Container width="1400px">
        <SectionHeading>
          <Heading content="What people say about us" />
        </SectionHeading>
        <ReactSlick {...settings}>
          {data.webAppCreativeJson.testimonials.map((testimonial) => (
            <Item key={testimonial.id}>
              <div>
                <figure>
                  <Image src={testimonial.logo.publicURL} alt="logo" />
                </figure>
                <Text as="blockquote" content={testimonial.quote} />
              </div>
              <AuthorInfo>
                <Heading as="h4" content={testimonial.author} />
                <Text content={testimonial.designation} />
              </AuthorInfo>
            </Item>
          ))}
        </ReactSlick>
      </Container>
    </Section>
  );
};

export default Testimonials;
