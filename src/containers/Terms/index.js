import React from "react";
import Container from "../../common/components/UI/Container";
import Heading from "../../common/components/Heading";
import Image from "../../common/components/Image";
import Text from "../../common/components/Text";
import Link from "../../common/components/Link";
import Sticky from "react-stickynode";

import { Header, Inner } from "./index.style";
import { Breadcrumb } from "antd";
import Content from "./Content";

const TermsAndConditions = () => {
  return (
    <Inner>
      <Sticky top={0} innerZ={999} activeClass="sticky-nav-active">
        <Header>
          <Container width="1400px">
            <div className="inner">
              <h1>תקנון האתר</h1>
              <Breadcrumb separator=">">
                <Breadcrumb.Item href="/">בית</Breadcrumb.Item>
                <Breadcrumb.Item href="">תקנון האתר</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Container>
        </Header>
      </Sticky>

      <Container width="1400px">
        <Content />
      </Container>
    </Inner>
  );
};

export default TermsAndConditions;
