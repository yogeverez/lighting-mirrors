import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
import Container from '../../common/components/UI/Container';
import Image from '../../common/components/Image';
import Text from '../../common/components/Text';
import Heading from '../../common/components/Heading';
import Section, { SectionHeading, SupportedApps } from './integration.style';

const Integrations = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     webAppCreativeJson {
  //       appIntegration {
  //         sectionTitle
  //         sectionDesc
  //         apps {
  //           id
  //           icon {
  //             publicURL
  //           }
  //           name
  //           bgColor
  //           isBlurred
  //         }
  //       }
  //     }
  //   }
  // `);
  const data = [];
  return (
    <Section>
      <Container width="1400px">
        <SectionHeading>
          <Heading
            content={data.webAppCreativeJson && data.webAppCreativeJson.appIntegration.sectionTitle}
          />
          <Text content={data.webAppCreativeJson &&  data.webAppCreativeJson.appIntegration.sectionDesc} />
        </SectionHeading>
        <SupportedApps>
          {data.webAppCreativeJson && data.webAppCreativeJson.appIntegration.apps.map((app) => (
            <figure
              key={app.id}
              className={app.isBlurred ? 'blurred' : undefined}
              style={{ backgroundColor: app.bgColor ?? undefined }}
            >
              <Image src={app.icon.publicURL} alt={app.name} />
            </figure>
          ))}
        </SupportedApps>
      </Container>
    </Section>
  );
};

export default Integrations;
