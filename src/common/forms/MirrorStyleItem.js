import React, { useState, useEffect } from "react";
import { Form, Radio } from "antd";
import { getFormItemVaidation } from "./helpers";
import JYR001 from "..//assets/image/mirrors/1.png";
import JYR002 from "..//assets/image/mirrors/2.png";
import JYR003 from "..//assets/image/mirrors/3.png";
import JYR004 from "..//assets/image/mirrors/4.png";
import JYR005 from "..//assets/image/mirrors/5.png";
import JYR006 from "..//assets/image/mirrors/6.png";

import JYT001 from "..//assets/image/mirrors/7.png";
import JYT002 from "..//assets/image/mirrors/8.png";
import JYT003 from "..//assets/image/mirrors/9.png";
import JYT004 from "..//assets/image/mirrors/10.png";

import JYS001 from "..//assets/image/mirrors/15.png";
import JYS002 from "..//assets/image/mirrors/16.png";
import JYS003 from "..//assets/image/mirrors/17.png";
import JYS004 from "..//assets/image/mirrors/18.png";
import JYS005 from "..//assets/image/mirrors/19.png";
import JYS006 from "..//assets/image/mirrors/20.png";
import JYS007 from "..//assets/image/mirrors/21.png";
import JYS008 from "..//assets/image/mirrors/22.png";
import JYS009 from "..//assets/image/mirrors/23.png";
import JYS010 from "..//assets/image/mirrors/24.png";
import JYS011 from "..//assets/image/mirrors/25.png";
import JYS012 from "..//assets/image/mirrors/26.png";

const MirrorStyleItem = (props) => {
  const { name, required, onChange, disabled, label, values } = props;
  let list = [
    {
      src: JYR001,
      value: "JY-R001",
      shape: "round",
      lighting: "back",
    },
    {
      src: JYR002,
      value: "JY-R002",
      shape: "round",
      lighting: "front",
    },
    {
      src: JYR003,
      value: "JY-R003",
      shape: "round",
      lighting: "front",
    },
    {
      src: JYR004,
      value: "JY-R004",
      shape: "round",
      lighting: "front",
    },
    {
      src: JYR005,
      value: "JY-R005",
      shape: "round",
      lighting: "back",
    },
    {
      src: JYR006,
      value: "JY-R006",
      shape: "round",
      lighting: "back",
    },
    {
      src: JYT001,
      value: "JY-T001",
      shape: "elipse",
      lighting: "back",
    },
    {
      src: JYT002,
      value: "JY-T002",
      shape: "elipse",
      lighting: "front",
    },
    {
      src: JYT003,
      value: "JY-T003",
      shape: "elipse",
      lighting: "front",
    },
    {
      src: JYT004,
      value: "JY-T004",
      shape: "elipse",
      lighting: "back",
    },
    {
      src: JYS001,
      value: "JY-S001",
      shape: "rectangle",
      lighting: "front",
    },
    {
      src: JYS002,
      value: "JY-S002",
      shape: "rectangle",
      lighting: "back",
    },
    {
      src: JYS003,
      value: "JY-S003",
      shape: "rectangle",
      lighting: "back",
    },
    {
      src: JYS004,
      value: "JY-S004",
      shape: "rectangle",
      lighting: "front",
    },
    {
      src: JYS005,
      value: "JY-S005",
      shape: "rectangle",
      lighting: "back",
    },
    {
      src: JYS006,
      value: "JY-S006",
      shape: "rectangle",
      lighting: "front",
    },
    {
      src: JYS007,
      value: "JY-S007",
      shape: "rectangle",
      lighting: "back",
    },
    {
      src: JYS008,
      value: "JY-S008",
      shape: "rectangle",
      lighting: "back",
    },
    {
      src: JYS009,
      value: "JY-S009",
      shape: "rectangle",
      lighting: "front",
    },
    {
      src: JYS010,
      value: "JY-S010",
      shape: "rectangle",
      lighting: "back",
    },
    {
      src: JYS011,
      value: "JY-S011",
      shape: "rectangle",
      lighting: "front",
    },
    {
      src: JYS012,
      value: "JY-S012",
      shape: "rectangle",
      lighting: "front",
    },
  ];
  const filtered = list.filter(
    (i) => i.shape === values.shape && i.lighting === values.lighting
  );
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
      <Radio.Group
        onChange={onChange}
        disabled={disabled}
        style={{ display: "inline-block" }}
      >
        {filtered.map((item, i) => (
          <Radio
            key={i}
            value={item["value"]}
            disabled={disabled}
            style={{
              width: "31%",
              paddingBottom: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              float: "right",
            }}
          >
            <div className="inner">
              <img src={item.src} style={{ width: "100%", height: "150px" }} />
            </div>
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default MirrorStyleItem;
