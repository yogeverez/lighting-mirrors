import React, { useState, useEffect, useContext } from "react";
import { Form, Input } from "antd";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import parseMobile from "libphonenumber-js/mobile";
import selectData from "../assets/country_codes_with_flags.json";
import PhoneInputWrapper from "./PhoneInputWrapper.style";
import { Select } from "antd";
const { Option } = Select;

const PhoneInputComponent = ({ value, onChange, disabled, isMobile }) => {
  const [countryCode, setCountryCode] = useState("+972");
  const [localNumber, setLocalNumber] = useState("");

  const [initial, setInitial] = useState(true);
  useEffect(() => {
    if (initial) {
      if (value) {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (phoneNumber) {
          setCountryCode("+" + phoneNumber.countryCallingCode);
          const local =
            phoneNumber.countryCallingCode === "972"
              ? "0" + phoneNumber.nationalNumber
              : phoneNumber.nationalNumber;
          setLocalNumber(local);
          setInitial(false);
        } else {
          var ret = value.replace(countryCode, "");
          setLocalNumber(ret);
          setInitial(false);
        }
      }
    }
  }, [value]);

  const onSelect = (code) => {
    setCountryCode(code);
    convertToValid(code, localNumber);
  };
  const onPhoneChange = (e) => {
    setLocalNumber(e.target.value);
    convertToValid(countryCode, e.target.value);
  };

  const convertToValid = (code, number) => {
    if (number !== "") {
      const phoneNumber = parsePhoneNumberFromString(code + number);
      if (
        phoneNumber &&
        phoneNumber.isValid() &&
        number.match(/^[0-9]+$/) != null
      ) {
        onChange(phoneNumber.number);
      } else {
        onChange(code + number);
      }
    } else {
      onChange(null);
    }
  };
  const select = (
    <Select
      bordered={false}
      optionLabelProp="label"
      dropdownClassName="dropdown"
      dropdownMatchSelectWidth={false}
      value={countryCode}
      onSelect={onSelect}
      disabled={disabled}
      style={{ width: "80px" }}
    >
      {selectData.map((item) => (
        <Option
          key={item.name}
          value={item.number}
          label={
            <div>
              <span className="number">{item.number} </span>
            </div>
          }
        >
          <div style={{ direction: "ltr" }}>
            <img
              alt="#"
              style={{ height: "16px", width: "24px" }}
              src={item.flag}
            />
            <span style={{ padding: "0 6px 0 30px" }}>{item.name} </span>
            <span>{item.number} </span>
          </div>
        </Option>
      ))}
    </Select>
  );
  return (
    <PhoneInputWrapper>
      <Input
        addonAfter={select}
        addonBefore={null}
        value={localNumber}
        style={{ width: "100%" }}
        onChange={onPhoneChange}
        disabled={disabled}
      />
    </PhoneInputWrapper>
  );
};

const PhoneNumberItem = (props) => {
  const { name, required, disabled, isMobile, hideLabel, label } = props;
  const phoneValidation = (value) => {
    let valid = false;
    if (value) {
      const phoneNumber = isMobile
        ? parseMobile(value)
        : parsePhoneNumberFromString(value);
      let isnum = value.substring(1).match(/^[0-9]+$/) != null;
      if (phoneNumber && isnum) {
        valid = phoneNumber.isValid();
      }
    }
    return valid || !value;
  };
  const requiredMessage = label + " " + "הוא שדה חובה";

  return (
    <Form.Item
      label={hideLabel ? null : label}
      name={name}
      // style={{ width: "250px" }}
      rules={[
        {
          required: required,
          message: requiredMessage,
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (phoneValidation(value)) {
              return Promise.resolve();
            }
            return Promise.reject("מספר הטלפון אינו תקין");
          },
        }),
      ]}
    >
      <PhoneInputComponent disabled={disabled} isMobile={isMobile} />
    </Form.Item>
  );
};

export default PhoneNumberItem;
