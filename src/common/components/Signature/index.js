import React, { useRef } from "react";
import { Button } from "antd";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Signature = (props) => {
  const { onChangeSignature } = props;

  const onChange = (path) => {
    console.log(path);
    canvasRef.current
      .exportImage("png")
      .then((data) => {
        onChangeSignature(data);
      })
      .catch(() => {});
  };

  const canvasRef = useRef();
  return (
    <div>
      <ReactSketchCanvas
        style={{
          border: "1px solid black",
          width: "250px",
          height: "150px",
        }}
        ref={canvasRef}
        strokeWidth={4}
        strokeColor="black"
        onStroke={onChange}
      />
      <div style={{ padding: "10px 0", display: "flex" }}>
        <Button
          onClick={() => {
            canvasRef.current.clearCanvas();
            onChangeSignature(null);
          }}
        >
          נקה חתימה
        </Button>
      </div>
    </div>
  );
};

export default Signature;
