import React from "react";
import { Form, Checkbox } from "antd";
import { getFormItemVaidation } from "./helpers";

const CheckboxItem = (props) => {
  const { name, label, required, showLabel, onChange, disabled } = props;
  const arr = [];
  if (required) {
    arr.push("required");
  }
  const rules = getFormItemVaidation(label, arr);
  return (
    <Form.Item
      name={name}
      rules={rules}
      valuePropName="checked"
      label={showLabel ? label : null}
      onChange={onChange}
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <Checkbox disabled={disabled}>{showLabel ? "" : label}</Checkbox>
    </Form.Item>
  );
};

export default CheckboxItem;
