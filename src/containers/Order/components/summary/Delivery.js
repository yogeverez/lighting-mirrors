import React from "react";
import { Typography } from "antd";
const { Text } = Typography;

const Delivery = (props) => {
  const { values } = props;

  const labels = {
    first_name: "שם פרטי",
    surename: "שם משפחה",
    business_name: "חשבונית ע״ש חברה/עסק",
    taxId: "ח״פ/ע״מ/ת״ז (לטובת החשבונית)",
    city: "עיר",
    street: "רחוב",
    house_number: "מספר בית",
    apartmant_number: "מספר דירה",
    floor_number: "מספר קומה",
    zip: "מיקוד",
    phone: "מספר טלפון",
    email: "אימייל",
    delivery_notes: "הערות למשלוח",
  };

  return (
    <div className="details">
      <h3 className="summary_title">פרטי משלוח</h3>
      <div className="spec">
        {values &&
          Object.keys(labels).map((key) => {
            return (
              <div style={{ display: "flex", textAlign: "right" }}>
                <div
                  style={{
                    display: "flex",
                    textAlign: "right",
                    width: "170px",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      width: "170px",
                      margin: 0,
                      lineHeight: 2.11,
                      color: "#858b91",
                    }}
                  >
                    {`${labels[key]}:`}
                  </Text>
                </div>

                <Text
                  style={{
                    display: "flex",
                    textAlign: "right",
                    padding: "0 2px",
                    fontWeight: "bold",
                    margin: 0,
                    color: "#09131f",
                  }}
                >
                  {values[key] && values[key]}
                </Text>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Delivery;
