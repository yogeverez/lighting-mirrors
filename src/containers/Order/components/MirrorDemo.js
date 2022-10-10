import React, { useEffect, useState } from "react";
import MirrorWrapper from "./Mirror.style";
import { Row, Col } from "antd";

import { useMediaQuery } from "react-responsive";
import functions from "../../../common/assets/image/mirrors/functions.png";
import simple from "../../../common/assets/image/mirrors/simple.png";
import Summary from "./Summary";
import Pricing from "./Pricing";

const MirrorDemo = (props) => {
  const { values } = props;
  const [width, setWidth] = useState(0);
  const [mirrorHeight, setMirrorHeight] = useState(0);
  const [mirrorWidth, setMirrorWidth] = useState(0);

  const [border, setBorder] = useState(0);
  const [borderColor, setBorderColor] = useState("transparent");
  const [lighting, setLighting] = useState("");
  const [shape, setShape] = useState("");
  const [technology, setTechnology] = useState("straight");
  const [borderRadius, setBorderRadius] = useState("0px");

  const isBigScreen = useMediaQuery({ query: "(min-width: 670px)" });
  console.log(values);
  useEffect(() => {
    if (isBigScreen) {
      // setWidth(window.innerWidth - 40);

      setWidth(650);
    } else {
      setWidth(window.innerWidth - 20);
    }
  }, [isBigScreen]);

  useEffect(() => {
    if (values.height) {
      setMirrorHeight(parseInt(values.height.replace("CM", "")));
    }
    if (values.width) {
      setMirrorWidth(parseInt(values.width.replace("CM", "")));
    }
    setBorder(values.frame);
    setBorderColor(
      values["frame-color"] === "black"
        ? "#000000"
        : values["frame-color"] === "gold"
        ? "#f5cc8a"
        : "transparent"
    );
    setTechnology(values.technology);
    setLighting(values.lighting);
    setShape(values.shape);
    if (values.shape) {
      if (values.shape === "rectangle") {
        setBorderRadius(values.corners === "round" ? "10px" : "0px");
      } else {
        setBorderRadius(`${width / 2}px`);
      }
    } else {
      setBorderRadius(values.corners === "round" ? "10px" : "0px");
    }
  }, [values]);
  return (
    <MirrorWrapper
      isBigScreen={isBigScreen}
      width={width}
      mirrorHeight={mirrorHeight}
      mirrorWidth={mirrorWidth}
      border={border}
      borderColor={borderColor}
      lighting={lighting}
      shape={shape}
      borderRadius={borderRadius}
    >
      <div className="container">
        <Summary values={values} />

        <div className="outer">
          <div className="inner">
            <div className="mirror" />
            {mirrorWidth && mirrorHeight && technology && (
              <img
                src={
                  technology[0] === "Three color lights" ? simple : functions
                }
                style={{
                  position: "relative",
                  width: "30px",
                  height: "15px",
                  bottom: "25px",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Pricing />
    </MirrorWrapper>
  );
};

export default MirrorDemo;
