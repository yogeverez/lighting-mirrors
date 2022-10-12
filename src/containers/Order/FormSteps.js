import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import PersonalDetails from "./components/PersonalDetails";
import Specifications from "./components/Specifications";
import Lighting from "./components/Lighting";
import MirrorDemo from "./components/MirrorDemo";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
const { Step } = Steps;

const FormSteps = (props) => {
  const [current, setCurrent] = useState(0);
  const { values } = props;

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
      content: <MirrorDemo values={values} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const phoneNumber = values.phone && parsePhoneNumberFromString(values.phone);
  console.log(phoneNumber);

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

    default:
      break;
  }

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
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
          >
            סיים
          </Button>
        )}
      </div>
    </>
  );
};

export default FormSteps;

// import { Divider, Steps } from "antd";
// import React, { useState } from "react";
// import PersonalDetails from "./components/PersonalDetails";
// const { Step } = Steps;

// const FormSteps = () => {
//   const [current, setCurrent] = useState(0);

//   const onChange = (value) => {
//     console.log("onChange:", current);
//     setCurrent(value);
//   };

//   return (
//     <Steps current={current} onChange={onChange} direction="vertical">
//       <Step title="פרטים אישיים" description="This is a description." />
//       {current === 0 && (
//         <div style={{ padding: "10px 0" }}>
//           <PersonalDetails />
//         </div>
//       )}

//       <Step title="Step 2" description="This is a description." />
//       <Step title="Step 3" description="This is a description." />
//     </Steps>
//   );
// };

// export default FormSteps;
