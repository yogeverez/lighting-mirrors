import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const Section = styled.section`
  position: relative;
  z-index: 0;
  @media (min-width: 768px) and (max-width: 1280px) {
    background-size: contain;
  }
  @media (min-width: 1280px) {
    margin-bottom: 50px;
  }
`;

export const OrderContentWrapper = styled.div`
  @media (min-width: 1280px) {
    min-height: 100vh;
  }
`;

export const Content = styled.div`
  // max-width: 1000px;
  padding: 10px 0 0 0;
  text-align: center;
  // @media (max-width: 1024px) {
  //   max-width: 660px;
  //   padding-top: 170px;
  // }
  // @media (max-width: 768px) {
  //   max-width: 550px;
  //   padding-top: 150px;
  // }
  // @media (max-width: 480px) {
  //   padding-top: 100px;
  // }
  h2 {
    color: ${themeGet("colors.headingColor")};
    font-weight: 700;
    font-size: 54px;
    line-height: 1.3;
    text-align: center;
    letter-spacing: -1px;
    @media (max-width: 1024px) {
      font-size: 40px;
    }
    @media (max-width: 768px) {
      font-size: 32px;
    }
    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
  p {
    font-weight: 500;
    font-size: 18px;
    line-height: 2.11;
    color: ${themeGet("colors.textColor")};
    max-width: 700px;
    margin: 0 auto;

    @media (max-width: 480px) {
      font-size: 16px;
      line-height: 1.6;
    }
  }
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
  }
  .ant-radio-wrapper-checked .inner {
    background: #1890ff;
  }
  .steps-content {
    padding: 10px;
    border: 1px solid #d9d9d9;
    margin: 10px 0;
    border-radius: 10px;
    max-height: calc(100vh - 245px);

    overflow: auto;
  }
`;

export default Section;
