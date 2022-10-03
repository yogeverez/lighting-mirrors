import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./common/theme";
import AppRoutes from "./router";
import AppWrapper from "./App.style";
import { ConfigProvider } from "antd";
import Auth from "./api/auth";

import "antd/dist/antd.css";

console.log(theme);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider direction="rtl">
        <AppWrapper>
          <AppRoutes />
        </AppWrapper>
      </ConfigProvider>
    </ThemeProvider>
  );
};
export default App;
