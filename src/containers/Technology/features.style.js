import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const SectionWrapper = styled.section`
  background-color: #f9f9f9;
  padding: 75px 0;
  overflow: hidden;
  @media only screen and (max-width: 1366px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 667px) {
    padding: 45px 0;
  }
`;

export const SectionHeader = styled.header`
  max-width: 802px;
  width: 100%;
  margin: 0 auto 58px;
  text-align: center;
  @media only screen and (max-width: 991px) {
    margin-bottom: 50px;
  }
  p {
    color: rgba(15, 33, 55, 0.65);
    font-family: "Inter", sans-serif;
    font-size: 18px;
    line-height: 1.4;
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
  }
  h5 {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 12px;
    letter-spacing: 1.5px;
    color: ${themeGet("colors.primary", "#2563FF")};
    text-transform: uppercase;
    @media only screen and (max-width: 991px) {
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
  h2 {
    font-weight: 800;
    font-size: 26px;
    line-height: 49px;
    margin-bottom: 1.5rem;
    color: ${themeGet("colors.headingColor", "#0F2137")};
    letter-spacing: -1px;
    @media only screen and (max-width: 1366px) {
      font-size: 28px;
      letter-spacing: -0.7px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 26px;
      line-height: 38px;
      letter-spacing: -0.5px;
    }
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -12px 0 -30px;

  > div {
    width: calc(100% / 3 - 34px);
    margin: 38px 0 30px;
    @media only screen and (max-width: 1366px) {
      width: calc(100% / 3 - 30px);
    }
    @media only screen and (max-width: 991px) {
      width: calc(100% / 2 - 30px);
    }
    @media only screen and (max-width: 767px) {
      width: calc(100% / 2 - 15px);
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
      margin-top: 15px;
    }
  }

  .feature__block {
    align-items: flex-start;
    @media only screen and (max-width: 767px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .icon__wrapper {
      position: relative;
      @media only screen and (max-width: 1366px) {
        img {
          height: 72px;
        }
      }
      @media only screen and (max-width: 480px) {
        img {
          height: 70px;
        }
      }
      i {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        color: var(--color);
        transition: all 0.5s cubic-bezier(0.75, -0.5, 0, 1.75);
        &.plus {
          top: 0;
          left: 0;
          transform: translate(20px, 20px) scale(0.1) rotate(-180deg);
        }
        &.circle {
          top: 0;
          right: 0;
          transform: translate(-20px, 20px) scale(0.1) rotate(-180deg);
        }
        &.star {
          bottom: -5px;
          left: calc(50% - 8px);
          transform: translate(0, -20px) scale(0.1) rotate(-180deg);
        }
      }
    }
    .content__wrapper {
      padding-left: 21px;
      @media only screen and (max-width: 1366px) {
        padding: 0 20px;
      }
      @media only screen and (max-width: 767px) {
        padding: 20px 0 0;
      }
      h3 {
        color: ${themeGet("colors.heading")};
        font-size: 19px;
        line-height: 30px;
        font-weight: 500;
        margin-bottom: 10px;
        @media only screen and (max-width: 1366px) {
          font-size: 18px;
          margin-bottom: 5px;
        }
      }
      p {
        color: ${themeGet("colors.textColor")};
        font-size: 15px;
        line-height: 28px;
        margin: 0;
      }
    }
    &:hover {
      .icon__wrapper {
        i {
          opacity: 1;
          visibility: visible;
          &.plus {
            transform: translate(-4px, -4px) scale(1) rotate(180deg);
          }
          &.circle {
            transform: translate(4px, -4px) scale(1) rotate(180deg);
          }
          &.star {
            transform: translate(0, 13px) scale(1) rotate(180deg);
          }
        }
      }
    }
  }
`;

export default SectionWrapper;
