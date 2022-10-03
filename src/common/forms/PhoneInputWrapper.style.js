import styled from "styled-components";

const PhoneInputWrapper = styled.div`
  display: flex;
  direction: ltr;
  .ant-select {
    direction: ltr;
    width: 130px;
    background: #f2f1f1;
    border-radius: 5px 0 0 5px;

    .ant-select-selection-item {
      text-align: left !important;
    }
    .ant-select-selection-item {
      padding-right: 5px !important;
    }
    img {
      height: 16px;
      width: 24px;
    }
    .number {
      padding: 0 10px 0 0;
    }
  }
  .ant-select-rtl {
    .ant-select-selection-item {
      padding-left: 5px !important;
    }
  }

  input {
    text-align: left;
    direction: ltr;
  }
`;

export default PhoneInputWrapper;
