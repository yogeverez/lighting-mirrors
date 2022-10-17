import React from "react";
import { Space, Typography } from "antd";
import CheckboxItem from "../../../common/forms/CheckboxItem";
const { Text, Link } = Typography;

const Spec = (props) => {
  const { values } = props;
  const width = "רוחב המראה";
  const height = "אורך המראה";
  const shape = "צורת המראה";
  const corners = "פינות";
  const frame = "מסגרת";
  const frameColor = "צבע המסגרת";
  const technology = "טכנולוגיה";
  const arr = values && [
    {
      label: width,
      value: values.width,
    },
    {
      label: height,
      value: values.height,
    },
    {
      label: shape,
      value:
        values.shape === "rectangle"
          ? "מלבנית"
          : values.shape === "elipse"
          ? "אליפסה"
          : "עגולה",
    },
    {
      label: corners,
      value: values.corners === "round" ? "מעוגלות" : "ישרות",
    },
    {
      label: frame,
      value: values.frame ? "כן" : "לא",
    },
    {
      label: frameColor,
      value: values["frame-color"] === "black" ? "שחור" : "זהב",
    },
    {
      label: technology,
      value:
        values &&
        values.technology &&
        values.technology[0] === "Three color lights"
          ? "שלושה סוגי תאורה"
          : "שליטה על עוצמת תאורה, הפשרת אדים, חיישן קירבה, תצוגת זמן וטמפרטורה, התקן בלוטוס",
    },
  ];

  //   corners: "round"
  // frame: true
  // frame-color: "black"
  // height: "100CM"
  // lighting: undefined
  // name: undefined
  // phone: undefined
  // shape: "rectangle"
  // style: undefined
  // technology: (5) ['Brightness control', 'Intelligent defogging', 'Human-body induction', 'Time / Temperature display', 'Bluetooth']
  // width: "44CM"

  return (
    <div className="details">
      <div className="spec">
        {values &&
          arr.map((item) => (
            <div style={{ display: "flex", textAlign: "right" }}>
              <div
                style={{ display: "flex", textAlign: "right", width: "100px" }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    width: "100px",
                    margin: 0,
                    lineHeight: 2.11,
                    color: "#858b91",
                  }}
                >
                  {`${item.label}:`}
                </Text>
              </div>

              <Text
                style={{
                  display: "flex",
                  textAlign: "right",
                  padding: "0 2px",
                  fontWeight: "bold",
                  margin: 0,
                  color: "#09131f",
                }}
              >
                {`${item.value}`}
              </Text>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Spec;
