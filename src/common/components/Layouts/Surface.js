import styled from "styled-components";

const Surface = styled.div`
  height: calc(100vh - 40px);

  background-color: #ffffff;
  padding: ${(props) => (props["padding"] === true ? "32px" : "24px")};
  margin: ${(props) =>
    props["noMargin"] === true ? "0px" : "20px 20px 0 20px"};
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  border-top-left-radius: ${(props) => (props["noTop"] === true ? "0" : "5px")};
  border-top-right-radius: ${(props) =>
    props["noTop"] === true ? "0" : "5px"};
`;

export default Surface;
