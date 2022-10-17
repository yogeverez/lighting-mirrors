import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import PersonalDetails from "./components/PersonalDetails";
import Specifications from "./components/Specifications";
import Lighting from "./components/Lighting";
import Summary from "./components/Summary";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import Heading from "../../common/components/Heading";
const { Step } = Steps;

const FormSteps = (props) => {
  const [current, setCurrent] = useState(0);
  const { values, addSignature, signature } = props;

  const steps = [
    {
      index: 0,
      title: "פרטים אישיים",
      content: <PersonalDetails />,
    },
    {
      index: 1,

      title: "נתוני המראה",
      content: <Specifications />,
    },
    {
      index: 2,

      title: "תאורה",
      content: <Lighting values={values} />,
    },
    {
      index: 3,

      title: "סיכום",
      content: <Summary values={values} addSignature={addSignature} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const phoneNumber = values.phone && parsePhoneNumberFromString(values.phone);
  let disabled = false;

  switch (current) {
    case 0:
      disabled =
        !values.name || !values.phone || !phoneNumber || !phoneNumber.isValid();
      break;
    case 1:
      disabled =
        !values.width ||
        !values.height ||
        !values.height ||
        !values.shape ||
        !values.corners ||
        values.frame === undefined ||
        !values["frame-color"] ||
        !values.technology;
      break;
    case 2:
      disabled =
        !values.lighting || (values.lighting === "front" && !values.style);
      break;

    case 3:
      disabled = !values.terms || !signature;
      break;

    default:
      break;
  }

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          background: " #f4f4f4",
        }}
      >
        <Heading content="יצירת מראה מותאמת אישית" as="h1" />
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>

      <div className="steps-content">
        {steps.map((item) => (
          <div style={{ display: current === item.index ? "initial" : "none" }}>
            {item.content}
          </div>
        ))}
      </div>
      <div className="steps-action">
        {current > 0 && (
          <Button
            shape="round"
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            הקודם
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            disabled={disabled}
            shape="round"
            type="primary"
            onClick={() => next()}
          >
            הבא
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            shape="round"
            type="primary"
            onClick={() => message.success("Processing complete!")}
            disabled={disabled}
          >
            מעבר לדף התשלום
          </Button>
        )}
      </div>
    </>
  );
};

export default FormSteps;
