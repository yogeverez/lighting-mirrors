import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { rgba } from "polished";

export const Inner = styled.div``;

export const Header = styled.header`
  background: #f4f4f4;
  padding: 5px 0;
  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    }
    h1 {
        margin: 0;
    }
  }
`;
