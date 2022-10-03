import React from 'react';
import Slider from 'react-slick';
 import Container from '../../common/components/UI/Container';
import Image from '../../common/components/Image';
import Text from '../../common/components/Text';
import Section, { Title, SliderWrapper, Figure } from './clients.style';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  responsive: [
    {
      breakpoint: 10000, // a unrealistically big number to cover up greatest screen resolution
      settings: 'unslick',
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const Clients = () => {
  const data = [];
  return (
    <Section>
      <Container width="1400px">
        <Title>
          <Text content="Join the 20,000+ companies using the Segment platform" />
        </Title>
        <SliderWrapper>
          <Slider {...settings}>
            {data.webAppCreativeJson.clients.map((client) => (
              <Figure key={client.id}>
                <Image src={client.logo.publicURL} alt={client.name} />
              </Figure>
            ))}
          </Slider>
        </SliderWrapper>
      </Container>
    </Section>
  );
};

export default Clients;
