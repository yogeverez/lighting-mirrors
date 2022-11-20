import React, { useRef, useEffect } from "react";
import { Form, InputNumber } from "antd";
import { getFormItemVaidation } from "./helpers";

const InputNumberItem = (props) => {
  const {
    name,
    required,
    id,
    number,
    email,
    disabled,
    onChange,
    preserve,
    autoComplete,
    allowClear,
    direction,
    autoFocus,
    style,
    label,
  } = props;
  const inputRef = useRef();

  useEffect(() => {
    if (autoFocus && inputRef && inputRef.current && !number) {
      const { input } = inputRef.current;
      input.focus();
    }
  });

  const arr = [];
  if (required) {
    arr.push("required");
  }
  if (id) {
    arr.push("id");
  }
  if (email) {
    arr.push("email");
  }

  const rules = getFormItemVaidation(label, arr);
  return (
    <Form.Item
      preserve={preserve}
      label={label}
      name={name}
      rules={rules}
      normalize={(value, prevValue, prevValues) =>
        email && value === "" ? null : value
      }
      onChange={onChange}
      style={style}
      // style={{ ...style, width: "250px" }}
    >
      <InputNumber
        disabled={disabled}
        allowClear={allowClear}
        style={{ direction }}
        ref={inputRef}
        min={1}
        max={10}
      />
    </Form.Item>
  );
};

export default InputNumberItem;
