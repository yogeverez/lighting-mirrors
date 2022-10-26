import React from "react";
import Container from "../../common/components/UI/Container";
import Sticky from "react-stickynode";

import { Header, Inner } from "./index.style";
import { Breadcrumb } from "antd";
import Content from "./Content";

const Privacy = () => {
  return (
    <Inner>
      <Sticky top={0} innerZ={999} activeClass="sticky-nav-active">
        <Header>
          <Container width="1400px">
            <div className="inner">
              <h1>מדיניות פרטיות</h1>
              <Breadcrumb separator=">">
                <Breadcrumb.Item href="/">בית</Breadcrumb.Item>
                <Breadcrumb.Item href="">מדיניות פרטיות</Breadcrumb.Item>
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

export default Privacy;
