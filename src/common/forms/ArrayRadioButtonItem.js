import React, { useState, useEffect } from "react";
import { Form, Radio } from "antd";
import { getFormItemVaidation } from "./helpers";

const ArrayRadioButtonItem = (props) => {
  const { name, required, onChange, disabled, label, technology } = props;
  const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    let list = null;
    if (technology) {
      list = [
        {
          value: [
            "Brightness control",
            "Intelligent defogging",
            "Human-body induction",
            "Time / Temperature display",
            "Bluetooth",
          ],
          name: [
            "שליטה על עוצמת תאורה",
            "הפשרת אדים",
            "חיישן קירבה",
            "תצוגת זמן וטמפרטורה",
            "התקן בלוטוס",
          ],
        },
        {
          value: ["Three color lights"],
          name: ["שלושה סוגי תאורה"],
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
  return (
    <Form.Item
      name={name}
      rules={rules}
      label={label}
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <Radio.Group onChange={onChange} disabled={disabled}>
        {selectData.map((item, i) => (
          <Radio key={i} value={item["value"]} disabled={disabled}>
            {item["name"].map((i) => (
              <span style={{ display: "flex" }}>{i}</span>
            ))}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default ArrayRadioButtonItem;
