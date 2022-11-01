const getFormItemVaidation = (label, arr) => {
  const requiredMessage = label + " " + "הוא שדה חובה";

  const emailMessage = "יש לספק אימייל תיקני";

  const required = {
    required: true,
    pattern: /^[\s\t\r\n]*\S+/,
    message: requiredMessage,
  };

  const email = {
    pattern:
      /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+$/,
    message: emailMessage,
  };

  const idMessage = "יש להכניס מספר ת.ז./ח.פ. תקני";
  const hasWhiteSpace = (s) => s.indexOf(" ") >= 0;

  const id = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value) {
        return Promise.resolve();
      }
      let strId = String(value).trim();
      if (
        hasWhiteSpace(String(value)) ||
        strId.length > 9 ||
        (strId.length < 8 && strId.length > 0)
      ) {
        return Promise.reject(idMessage);
      }
      if (strId.length < 9) {
        while (strId.length < 9) strId = "0" + strId;
      }
      let counter = 0,
        rawVal,
        actualVal;
      for (let i = 0; i < strId.length; i++) {
        rawVal = Number(strId[i]) * ((i % 2) + 1);
        actualVal = rawVal > 9 ? rawVal - 9 : rawVal;
        counter += actualVal;
      }
      if (counter % 10 === 0) {
        return Promise.resolve();
      } else {
        return Promise.reject(idMessage);
      }
    },
  });

  const definedrules = {
    required: required,
    email: email,
    id: id,
  };
  let rules = [];

  arr.forEach(function (rull) {
    rules.push(definedrules[rull]);
  });

  return rules;
};

export { getFormItemVaidation };
