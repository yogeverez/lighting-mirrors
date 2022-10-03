// import React from 'react';
// import Fade from 'react-reveal/Fade';
// import { useStaticQuery, graphql } from 'gatsby';
// import { Icon } from 'react-icons-kit';
// import { check } from 'react-icons-kit/feather/check';
// import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';
// import Container from '../../common/components/UI/Container';
// import Button from '../../common/components/Button';
// import Text from '../../common/components/Text';
// import Link from '../../common/components/Link';
// import Heading from '../../common/components/Heading';
// import GatsbyImage from '../../common/components/GatsbyImage';
// import Section, { Grid, Figure, Content, Features } from './analytics.style';
// import parallaxBg from '../../common/assets/image/parallax-1.png';

// const AnalyticsTool = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       analytics: file(
//         relativePath: { eq: "image/webAppCreative/analytics.png" }
//       ) {
//         childImageSharp {
//           gatsbyImageData(
//             width: 761
//             placeholder: BLURRED
//             formats: [AUTO, WEBP, AVIF]
//           )
//         }
//       }
//       webAppCreativeJson {
//         analyticsTool {
//           slogan
//           title
//           desc
//           features
//           button {
//             link
//             label
//           }
//         }
//       }
//     }
//   `);
//   const analyticsTool = data.webAppCreativeJson.analyticsTool;

//   return (
//     <Section bgImage={parallaxBg} bgImageAlt="the cat" strength={200}>
//       <Container width="1400px">
//         <Grid>
//           <Fade up>
//             <Figure>
//               <GatsbyImage
//                 src={
//                   (data.analytics !== null) | undefined
//                     ? data.analytics.childImageSharp.gatsbyImageData
//                     : {}
//                 }
//                 alt="dashboard"
//               />
//             </Figure>
//           </Fade>
//           <Content>
//             <Text className="subtitle" content={analyticsTool.slogan} />
//             <Heading content={analyticsTool.title} />
//             <Text className="description" content={analyticsTool.desc} />
//             <Features>
//               {analyticsTool.features.map((feat, i) => (
//                 <li key={i}>
//                   <Icon icon={check} size={22} />
//                   {feat}
//                 </li>
//               ))}
//             </Features>
//             <Link href={analyticsTool.button.link} className="explore">
//               <Button
//                 title={analyticsTool.button.label}
//                 icon={<Icon icon={ic_keyboard_arrow_right} size={24} />}
//               />
//             </Link>
//           </Content>
//         </Grid>
//       </Container>
//     </Section>
//   );
// };

// export default AnalyticsTool;
