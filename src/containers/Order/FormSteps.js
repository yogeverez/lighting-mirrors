import { Button, message, Steps } from "antd";
import React, { useEffect, useState } from "react";
import PersonalDetails from "./components/PersonalDetails";
import Specifications from "./components/Specifications";
import Technology from "./components/Technology";
import Lighting from "./components/Lighting";
import Payment from "./components/Payment";
import Summary from "./components/Summary";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import Heading from "../../common/components/Heading";
import { useMediaQuery } from "react-responsive";

const { Step } = Steps;

const FormSteps = (props) => {
  const [current, setCurrent] = useState(0);
  const { values, addSignature, signature, paymentUrl, loading } = props;
  const isBigScreen = useMediaQuery({ query: "(min-width: 991px)" });

  useEffect(() => {
    if (paymentUrl && current === 2) {
      next();
    }
  }, [paymentUrl]);

  const steps = [
    {
      index: 0,

      title: "גודל, צורה, תאורה וטכנולוגיה",
      content: <Specifications values={values} />,
    },
    // {
    //   index: 1,

    //   title: "תאורה",
    //   content: <Lighting values={values} />,
    // },

    // {
    //   index: 2,

    //   title: "טכנולוגיה",
    //   content: <Technology values={values} />,
    // },
    {
      index: 1,
      title: "פרטי משלוח",
      content: <PersonalDetails />,
    },
    {
      index: 2,
      title: "סיכום",
      content: <Summary values={values} addSignature={addSignature} />,
    },

    {
      index: 3,
      title: "תשלום",
      content: <Payment paymentUrl={paymentUrl} />,
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
        !values.width ||
        !values.height ||
        !values.height ||
        !values.shape ||
        (values.shape === "rectangle" && !values.corners) ||
        values.frame === undefined ||
        (values.frame === true && !values["frame-color"]) ||
        !values.lighting ||
        (values.lighting === "front" && !values.style) ||
        !values.technology;
      break;
    // case 1:
    //   disabled =
    //     !values.lighting || (values.lighting === "front" && !values.style);
    //   break;
    // case 2:
    //   disabled = !values.technology;
    //   break;

    case 2:
      disabled = !values.terms || !signature;
      break;
    case 1:
      disabled =
        !values.first_name ||
        !values.surename ||
        !values.city ||
        !values.street ||
        !values.house_number ||
        !values.phone ||
        !phoneNumber ||
        !phoneNumber.isValid();
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
          background: "#ffffff",
          padding: "0 24px 10px 24px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Heading content="יצירת מראה מותאמת אישית" as="h1" />
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>

      <div
        className="steps-content"
        style={{
          height: isBigScreen
            ? window.innerHeight - 230
            : window.innerHeight - 350,
        }}
      >
        <div
          className="steps-inner"
          style={{
            width:
              isBigScreen && current === steps.length - 2
                ? "800px"
                : isBigScreen
                ? "500px"
                : "100%",
          }}
        >
          {steps.map((item) => (
            <div
              style={{ display: current === item.index ? "initial" : "none" }}
            >
              {item.content}
            </div>
          ))}
        </div>
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
        {current < steps.length - 2 && (
          <Button
            disabled={disabled}
            shape="round"
            type="primary"
            onClick={() => next()}
          >
            הבא
          </Button>
        )}
        {current === steps.length - 2 && (
          <Button
            shape="round"
            type="primary"
            htmlType="submit"
            disabled={disabled}
            loading={loading}
          >
            מעבר לדף התשלום
          </Button>
        )}
      </div>
    </>
  );
};

export default FormSteps;
