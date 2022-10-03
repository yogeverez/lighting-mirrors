import React from 'react';
import { Icon } from 'react-icons-kit';
import Fade from 'react-reveal/Fade';
// import { useStaticQuery, graphql } from 'gatsby';
import { arrowRight } from 'react-icons-kit/feather/arrowRight';
import GatsbyImage from '../../common/components/GatsbyImage';
import Container from '../../common/components/UI/Container';
import Heading from '../../common/components/Heading';
import Text from '../../common/components/Text';
import Link from '../../common/components/Link';

import { Section, SectionHeading, Grid, Article } from './newsFeed.style';

const NewsFeed = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     webAppCreativeJson {
  //       posts {
  //         id
  //         date
  //         image {
  //           src {
  //             childImageSharp {
  //               gatsbyImageData(
  //                 layout: FULL_WIDTH
  //                 placeholder: BLURRED
  //                 formats: [AUTO, WEBP, AVIF]
  //               )
  //             }
  //           }
  //           alt
  //         }
  //         title
  //         excerpt {
  //           label
  //           link
  //         }
  //       }
  //     }
  //   }
  // `);
  const data = [];
  return (
    <Section id="newsfeed">
      <Container width="1400px">
        <SectionHeading>
          <Heading content="What our author post on Newsfeed" />
        </SectionHeading>
        <Grid>
          {data.webAppCreativeJson && data.webAppCreativeJson.posts.map((post) => (
            <Fade key={post.id} up delay={post.id * 100}>
              <Article>
                <GatsbyImage
                  src={
                    (post.image.src !== null) | undefined
                      ? post.image.src.childImageSharp.gatsbyImageData
                      : {}
                  }
                  alt={post.image.alt}
                />
                <Text content={post.date} />
                <Heading as="h4" content={post.title} />
                <Link href={post.excerpt.link}>
                  {post.excerpt.label} <Icon icon={arrowRight} />
                </Link>
              </Article>
            </Fade>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default NewsFeed;
