import React, { useEffect, useState, useContext } from "react";
import { Form, Select } from "antd";
import { getFormItemVaidation } from "./helpers";
import citieList from "../assets/israel_cities_list.json";
const { Option } = Select;

const AutoCompleteItem = (props) => {
  const { name, required, category, city, disabled, label, onChange, ...rest } =
    props;
  const [data, setData] = useState([]);

  useEffect(() => {
    let selectData = [];
    if (city) {
      selectData = citieList;
    }
    setData(selectData);
  }, [city, data]);

  const arr = [];
  if (required) {
    arr.push("required");
  }
  const rules = getFormItemVaidation(label, arr);
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        {...rest}
        disabled={disabled}
        onChange={onChange}
        showSearch={true}
        filterOption={(input, option) => option.children.indexOf(input) >= 0}
        allowClear
        getPopupContainer={(trigger) => trigger.parentElement}
      >
        {data.map((option) => (
          <Option key={option.value} value={option.label}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AutoCompleteItem;
