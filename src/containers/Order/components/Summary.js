import React, { useEffect, useState } from "react";
import SummaryWrapper from "./Summary.style";
import Signature from "../../../common/components/Signature";
import InputNumberItem from "../../../common/forms/InputNumberItem";
import { useMediaQuery } from "react-responsive";
import functions from "../../../common/assets/image/mirrors/functions.png";
import simple from "../../../common/assets/image/mirrors/simple.png";
import Spec from "./summary/Spec";
import Delivery from "./summary/Delivery";

import Pricing from "./summary/Pricing";

const Summary = (props) => {
  const { values, addSignature } = props;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
    const maxWidth = isBigScreen
      ? window.innerWidth / 2 - 80
      : window.innerWidth - 80;
    const ratio = mirrorWidth / mirrorHeight;
    const finalWidth = ratio > 1 ? maxWidth : maxWidth * ratio;
    setWidth(finalWidth);
  }, [mirrorWidth, mirrorHeight, isBigScreen]);

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

  const onChangeSignature = (data) => {
    addSignature(data);
  };

  return (
    <SummaryWrapper
      isBigScreen={isBigScreen}
      width={width}
      height={height}
      mirrorHeight={mirrorHeight}
      mirrorWidth={mirrorWidth}
      border={border}
      borderColor={borderColor}
      lighting={lighting}
      shape={shape}
      borderRadius={borderRadius}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: isBigScreen ? "row" : "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "0 20px",
            }}
          >
            <Spec values={values} />
            <Delivery values={values} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "0 20px",
            }}
          >
            <Pricing values={values} onChangeSignature={onChangeSignature} />
          </div>
        </div>
      </div>
    </SummaryWrapper>
  );
};

export default Summary;

{
  /* <div className="outer">
  <div className="inner">
    <div className="mirror" />
    {mirrorWidth && mirrorHeight && technology && (
      <img
        src={technology[0] === "Three color lights" ? simple : functions}
        style={{
          position: "relative",
          width: "30px",
          height: "15px",
          bottom: "25px",
        }}
      />
    )}
  </div>
</div>; */
}
