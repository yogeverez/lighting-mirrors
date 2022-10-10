import styled from "styled-components";
import pattern from "../../../common/assets/image/mirrors/pattern.png";

const MirrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
  .details {
    width: 50%;
    height: 100%;
    .spec {
      background: #f6f8fb;
      padding: 10px;
      border-radius: 20px;
    }
  }
  .outer {
    width: 50%;
    //   background-color: red;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
  .inner {
    width: ${(props) =>
      props["width"] ? `${props["width"] / 2 - 40}px` : "100%"};
    height: ${(props) =>
      props["width"] ? `${props["width"] / 2 - 40}px` : "100%"};
    display: flex;
    justify-content: center;
    flex-direction: column;

    align-items: center;
    // background-color: green;
  }
  .mirror {
    width: ${(props) =>
      props["mirrorWidth"] ? `${props["mirrorWidth"]}%` : "0%"};
    height: ${(props) =>
      props["mirrorHeight"] ? `${props["mirrorHeight"]}%` : "0%"};
    // background-color: white;
    background: url(${pattern}) no-repeat center;
    background-size: cover;

    border: ${(props) => (props["border"] === true ? "3px solid" : "none")};
    border-color: ${(props) => props["borderColor"]};
    border-radius: ${(props) => props["borderRadius"]};
    // box-shadow: 0 0px 45px 5px #f5cc8a;
  }
`;

export default MirrorWrapper;
