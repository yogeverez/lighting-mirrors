import React from "react";
import { Space, Typography } from "antd";
import CheckboxItem from "../../../../common/forms/CheckboxItem";
import Signature from "../../../../common/components/Signature";
import InputNumberItem from "../../../../common/forms/InputNumberItem";
const { Text, Link } = Typography;

const Pricing = (props) => {
  const { values, onChangeSignature } = props;
  const mirrorPrice = 2500;
  const price = values.quantity ? mirrorPrice * values.quantity : mirrorPrice;
  const tempSumHe = `סכום ביניים`;
  const deliveryHe = `משלוח`;
  const vatHe = `מע״מ`;
  const totalSumHe = `סה״כ לתשלום`;
  const locale = "he";

  const totalPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(price);
  const vatPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format((price / 1.17) * 0.17);
  const deliveryPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(0);
  const tempPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(price / 1.17);

  const priceItem = (label, value, total) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Text
        style={{
          textAlign: "right",
          width: "150px",
          margin: 0,
          lineHeight: 2.11,
          color: total ? "#52c41a" : "#858b91",
          fontSize: total ? "1.3em" : "initial",
          fontWeight: total ? "bold" : "initial",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          display: "flex",
          textAlign: "right",
          padding: "0 2px",
          fontWeight: "bold",
          margin: 0,
          color: total ? "#52c41a" : "#09131f",
          fontSize: total ? "1.3em" : "initial",
        }}
      >
        {value}
      </Text>
    </div>
  );
  return (
    <div className="details">
      <h3 className="summary_title">עלות</h3>
      <div className="spec">
        {priceItem(tempSumHe, tempPrice)}
        {priceItem(deliveryHe, deliveryPrice)}
        {priceItem(vatHe, vatPrice)}
        {priceItem(totalSumHe, totalPrice, true)}
        <InputNumberItem name={"quantity"} required={true} label={"כמות"} />

        <Signature onChangeSignature={onChangeSignature} />
        <div className="pricing">
          <CheckboxItem
            name={"terms"}
            required={true}
            label={"אני מאשר את תנאי ההתקשרות"}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
