import React, { useState, useEffect } from "react";
import { Form, Radio } from "antd";
import { getFormItemVaidation } from "./helpers";

const RadioButtonItem = (props) => {
  const {
    name,
    required,
    corners,
    frame,
    trueFalse,
    identfierId,
    onChange,
    disabled,
    label,
    lighting,
    shape,
    frameColor,
  } = props;
  const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    let list = null;
    if (frame) {
      list = [
        {
          id: "withFrame",
          name: "עם מסגרת",
        },
        {
          id: "noFrame",
          name: "ללא מסגרת",
        },
      ];
    } else if (corners) {
      list = [
        {
          id: "straight",
          name: "ישרות",
        },
        {
          id: "rounded",
          name: "מעוגלות",
        },
      ];
    } else if (trueFalse) {
      list = [
        {
          id: true,
          name: "כן",
        },
        {
          id: false,
          name: "לא",
        },
      ];
    } else if (lighting) {
      list = [
        {
          id: "back",
          name: "אחורית (מומלץ)",
        },
        {
          id: "front",
          name: "קדמית",
        },
      ];
    } else if (shape) {
      list = [
        {
          id: "rectangle",
          name: "מלבנית",
        },
        {
          id: "round",
          name: "עגולה",
        },
        {
          id: "elipse",
          name: "אליפסה",
        },
      ];
    } else if (frameColor) {
      list = [
        {
          id: "black",
          name: "שחור",
        },
        {
          id: "gold",
          name: "זהב",
        },
      ];
    }

    if (list) {
      setSelectData(list);
    }
  }, []);

  const arr = [];
  if (required) {
    arr.push("required");
  }
  const rules = getFormItemVaidation(label, arr);
  const identfier = identfierId ? identfierId : "id";
  return (
    <Form.Item
      name={name}
      rules={rules}
      label={label}
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <Radio.Group onChange={onChange} disabled={disabled}>
        {selectData.map((item, i) => (
          <Radio key={i} value={item[identfier]} disabled={disabled}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioButtonItem;
