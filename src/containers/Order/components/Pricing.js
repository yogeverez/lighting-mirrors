import React from "react";
import { Space, Typography } from "antd";
import CheckboxItem from "../../../common/forms/CheckboxItem";

const { Text, Link } = Typography;

const Pricing = (props) => {
  return (
    <div className="pricing">
      <Text
        style={{
          textAlign: "right",
          display: "flex",
          fontWeight: "bold",
          fontSize: "1.3em",
          paddingTop: "10px",
        }}
        type="success"
      >
        סה״כ לתשלום: 2,500 ש״ח
      </Text>

      <CheckboxItem
        name={"terms"}
        required={true}
        label={"אני מאשר את תנאי ההתקשרות"}
      />
    </div>
  );
};

export default Pricing;
