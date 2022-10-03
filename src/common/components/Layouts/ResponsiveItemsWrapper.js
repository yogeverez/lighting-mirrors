import React from "react";
import { useMediaQuery } from "react-responsive";

const ResponsiveItemsWrapper = (props) => {
  const { children, overflow, height } = props;
  const isBigScreen = useMediaQuery({ query: "(min-width: 991px)" });
  const direction = isBigScreen ? "row" : "column";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        overflow: overflow ? "auto" : "initial",
        height: height ? height : "initial",
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveItemsWrapper;
