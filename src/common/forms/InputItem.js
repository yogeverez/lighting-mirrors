import React, { useRef, useEffect } from "react";
import { Form, Input } from "antd";
import { getFormItemVaidation } from "./helpers";

const InputItem = (props) => {
  const {
    name,
    required,
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
      <Input
        disabled={disabled}
        autoComplete={autoComplete ? autoComplete : "off"}
        allowClear={allowClear}
        style={{ direction }}
        ref={inputRef}
      />
    </Form.Item>
  );
};

export default InputItem;
