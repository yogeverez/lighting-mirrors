import React, { useState } from "react";
import { Form, Row, Col, Button } from "antd";
import PhoneNumberItem from "../../../common/forms/PhoneNumberItem";
import InputItem from "../../../common/forms/InputItem";
import AutoCompleteItem from "../../../common/forms/AutoCompleteItem";
import ResponsiveItemsWrapper from "../../../common/components/Layouts/ResponsiveItemsWrapper";
import Spacer from "../../../common/components/Layouts/Spacer";
import Auth from "../../../api/auth";

const PersonalDetails = (props) => {
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <InputItem name={"first_name"} required={true} label={"שם פרטי"} />
          </div>
          <Spacer horizontal={true} />

          <div style={{ flex: 1 }}>
            <InputItem name={"surename"} required={true} label={"שם משפחה"} />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <InputItem name={"business_name"} label={"חשבונית ע״ש חברה/עסק"} />
          </div>
          <Spacer horizontal={true} />

          <div style={{ flex: 1 }}>
            <InputItem
              name={"taxId"}
              label={"ח״פ/ע״מ/ת״ז (לטובת החשבונית)"}
              id={true}
            />
          </div>
        </ResponsiveItemsWrapper>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <AutoCompleteItem
              name="city"
              city={true}
              required={true}
              label={"עיר"}
              // onChange={onCityChanged}
            />
          </div>
          <Spacer horizontal={true} />

          <div style={{ flex: 1 }}>
            <InputItem name={"street"} required={true} label={"רחוב"} />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <InputItem
              name={"house_number"}
              required={true}
              label={"מספר בית"}
            />
          </div>
          <Spacer horizontal={true} />

          <div style={{ flex: 1 }}>
            <InputItem name={"apartmant_number"} label={"מספר דירה"} />
          </div>
        </ResponsiveItemsWrapper>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <InputItem name={"floor_number"} label={"מספר קומה"} />
          </div>
          <Spacer horizontal={true} />

          <div style={{ flex: 1 }}>
            <InputItem name={"zip"} label={"מיקוד"} />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}>
            <PhoneNumberItem
              name={"phone"}
              required={true}
              label={"מספר טלפון"}
            />
          </div>
          <Spacer horizontal={true} />

          <div style={{ flex: 1 }}>
            <InputItem
              name={"email"}
              label={"אימייל"}
              required={true}
              email={true}
            />
          </div>
        </ResponsiveItemsWrapper>
        <ResponsiveItemsWrapper>
          <div style={{ flex: 1 }}>
            <InputItem name={"delivery_notes"} label={"הערות למשלוח"} />
          </div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}></div>
          <Spacer horizontal={true} />
          <div style={{ flex: 1 }}></div>
        </ResponsiveItemsWrapper>
      </Col>
    </Row>
  );
};

export default PersonalDetails;
