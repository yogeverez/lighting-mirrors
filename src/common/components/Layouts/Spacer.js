import styled from "styled-components";

const Spacer = styled.div`
  width: ${(props) => (props["horizontal"] === true ? "20px" : "0")};
  height: ${(props) =>
    props["vertical"] === true
      ? props["extra"] === true
        ? "20px"
        : "10px"
      : "0"};
`;

export default Spacer;
