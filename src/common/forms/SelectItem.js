import React from "react";
import { Form, Select, Tag } from "antd";
import { getFormItemVaidation } from "./helpers";
const { Option } = Select;

const SelectItem = (props) => {
  const {
    name,
    required,
    disabled,
    onChange,
    label,
    filterItems,
    width,
    height,
    shape,
    frameColor,
  } = props;

  const arr = [];
  if (required) {
    arr.push("required");
  }

  const rules = getFormItemVaidation(label, arr);
  let selectData = [];

  if (width || height) {
    var i;
    for (i = 40; i < 101; i++) {
      selectData.push({
        value: `${i}CM`,
        name: `${i} סנטימטר`,
      });
    }
  } else if (shape) {
    selectData = [
      {
        value: "rectangle",
        name: "מלבנית",
      },
      {
        value: "round",
        name: "עגולה",
      },
      {
        value: "elipse",
        name: "אליפסה",
      },
    ];
  } else if (frameColor) {
    selectData = [
      {
        value: "black",
        name: "שחור",
      },
      {
        value: "gold",
        name: "זהב",
      },
    ];
  }

  const filtered = filterItems ? filterItems(selectData) : selectData;

  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select tagRender={tagRender} onChange={onChange} disabled={disabled}>
        {filtered.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectItem;
