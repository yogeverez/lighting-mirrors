import jsPDF from "jspdf";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import JYR004 from "../assets/image/mirrors/4.png";

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
const getPdfMargins = (doc) => {
  return 40 / doc.internal.scaleFactor;
};

const getOrderPdf = (values) => {
  let orderPdf = new jsPDF({ orientation: "p" });
  setHeader(orderPdf, values);

  window.open(orderPdf.output("bloburl"), "_blank");

  console.log(values);
};

const getLocalPhoneNumber = (phone) => {
  const phoneNumber = phone ? parsePhoneNumberFromString(phone) : null;
  if (phoneNumber) {
    return phoneNumber.formatNational();
  }
  return phone;
};

const getAddress = (record) => {
  const street =
    record && record.street !== undefined
      ? record.street.trim() + " " + record.house_number
      : "";
  const address =
    record && record.city !== undefined
      ? record.city.trim() + ", " + street
      : street;
  return address;
};

const isHebrew = (text) => {
  return text.search(/[\u0590-\u05FF]/) >= 0;
};

const setEnHeItem = (doc, Hloc, vLoc, content, align) => {
  doc.setR2L(isHebrew(content));
  doc.text(Hloc, vLoc, content, align);
};
export { getFormItemVaidation, getOrderPdf };

export const setHeader = (doc, values) => {
  const margins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - margins;

  var pdfConfig = {
    headerTextSize: 20,
    labelTextSize: 12,
    fieldTextSize: 10,
    lineHeight: 6,
    subLineHeight: 4,
  };
  var currentHeight = 20;

  var colorBlack = "#000000";
  var colorGray = "#4d4e53";
  const organizationName = "שם הארגון";
  const phone = values.phone ? getLocalPhoneNumber(values.phone) : null;
  // const mobile =
  //   record.branch && record.branch.mobile_number
  //     ? getLocalPhoneNumber(record.branch.mobile_number)
  //     : null;
  // const address = getAddress(values);
  const header = {
    firmEn: "Watchmarks Ltd",
    firmHe: "ווטשמרקס בע״מ",
    addressEn: "Hateena 20, Giva'at Brener",
    addressHe: "התאנה 20, גבעת ברנר",
    phone: "+972-508698824",
    email: "info@watchmarks.com",
    website: "www.lighting-mirrors.com",
    toEn: "To:",
    toHe: "לכבוד:",
  };
  const address = [values.city, values.street, values.house_number].join(", ");

  const from = `ווטשמרקס בע״מ`;
  const title = `טופס הזמנה`;
  const phoneText = phone ? `טלפון: ${phone}` : ``;
  // const mobileText = mobile ? `סלולארי: ${mobile}` : ``;
  const addressText = address ? `כתובת: ${address}` : ``;

  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.text(margins, currentHeight, header.firmEn, "left");
  doc.setR2L(true);
  doc.setFont("Rubik", "normal"); // set font
  doc.text(rightMargin, currentHeight, header.firmHe, "right");
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorGray);
  currentHeight += 5;
  doc.setR2L(false);
  doc.text(margins, currentHeight, header.addressEn, "left");
  doc.setR2L(true);
  doc.text(rightMargin, currentHeight, header.addressHe, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.setR2L(false);
  doc.text(margins, currentHeight, header.phone, "left");
  doc.text(rightMargin, currentHeight, header.phone, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(margins, currentHeight, header.email, "left");
  doc.text(rightMargin, currentHeight, header.email, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(margins, currentHeight, header.website, "left");
  doc.text(rightMargin, currentHeight, header.website, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.line(margins, currentHeight, rightMargin, currentHeight);

  currentHeight += pdfConfig.subLineHeight;
  doc.setR2L(false);
  doc.text(margins, currentHeight, header.toEn, "left");
  doc.setR2L(true);
  doc.text(rightMargin, currentHeight, header.toHe, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.setR2L(false);
  setEnHeItem(doc, margins, currentHeight, values.business_name, "left");
  doc.setR2L(true);
  setEnHeItem(doc, rightMargin, currentHeight, values.business_name, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.setR2L(false);
  setEnHeItem(doc, margins, currentHeight, address, "left");
  doc.setR2L(true);
  setEnHeItem(doc, rightMargin, currentHeight, address, "right");

  doc.setR2L(false);
  currentHeight += pdfConfig.subLineHeight;
  doc.setR2L(false);
  doc.text(margins, currentHeight + 0.3, values.phone, "left");
  doc.text(rightMargin, currentHeight + 0.3, values.phone, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(margins, currentHeight, values.email, "left");
  doc.text(rightMargin, currentHeight, values.email, "right");

  // doc.setFontSize(9);
  // doc.setTextColor(40);
  // doc.setR2L(true);
  // doc.setFont("Rubik", "normal"); // set font

  var hLoc = doc.internal.pageSize.getWidth() - margins;
  // doc.text(from, hLoc, 20, {
  //   align: "right",
  // });
  doc.setFont("Rubik", "normal");
  // doc.text(phoneText, margins, 20, {
  //   align: "left",
  // });
  // doc.text(mobileText, margins, 24, {
  //   align: "left",
  // });
  // doc.text(addressText, margins, 30, {
  //   align: "left",
  // });
  const logo = JYR004;
  // if (logo) {
  //   doc.addImage(
  //     logo,
  //     "png",
  //     doc.internal.pageSize.getWidth() / 2 - margins,
  //     12,
  //     (12 / logo.height) * logo.width,
  //     12
  //   );
  // }
  doc.setFontSize(14);
  doc.setFont("Rubik", "bold");
  // doc.text(title, hLoc, 31, {
  //   align: "right",
  // });
  doc.setFont("Rubik", "normal");
};
