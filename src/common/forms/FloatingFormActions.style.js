import styled from "styled-components";

const FloatingFormActionsWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  z-index: 999;
  left: ${(props) => (props["direction"] === "rtl" ? "20px" : "inherit")};
  right: ${(props) => (props["direction"] === "ltr" ? "20px" : "inherit")};

  width: auto;
  .floatingBtn {
    height: 50px !important;
    border-radius: 30px !important;
    box-shadow: 0 2px 8px 0 rgba(15, 28, 68, 0.1);
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.16) !important;
  }
`;

export default FloatingFormActionsWrapper;
