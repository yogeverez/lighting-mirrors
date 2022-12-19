import jsPDF from "jspdf";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import JYR004 from "../assets/image/mirrors/4.png";
import autoTable from "jspdf-autotable";
import { setPersistence } from "firebase/auth";
import moment from "moment";

var colorBlack = "#000000";
var colorGray = "#4d4e53";

var pdfConfig = {
  headerTextSize: 20,
  labelTextSize: 12,
  fieldTextSize: 10,
  declerationTextSize: 8,
  lineHeight: 6,
  subLineHeight: 4,
  titleLineHeight: 8,
};

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

const getAutoTableData = (data) => {
  let columns = [];
  if (data[0]) {
    Object.keys(data[0]).forEach((key) =>
      columns.push({
        header: key,
        dataKey: key,
      })
    );
  }
  return {
    columns: columns,
    body: data,

    headStyles: {
      fillColor: "#464646",
    },
    alternateRowStyles: {
      fillColor: "#FAFAFA",
    },
  };
};

const getHebrewData = (values) => {
  const columns = {
    frame: "מסגרת",
    "frame-color": "צבע מסגרת",
    height: "גובה",
    width: "רוחב",
    lighting: "סוג תאורה",
    quantity: "כמות",
    shape: "צורה",
    technology: "טכנולוגייה",
    price: "עלות",
  };
  const dic = {
    withFrame: "עם מסגרת",
    noFrame: "ללא מסגרת",
    straight: "ישרות",
    rounded: "מעוגלות",
    back: "תאורה אחורית",
    front: "תאורה קדמית",
    rectangle: "מלבנית",
    round: "עגולה",
    elipse: "אליפסה",
    black: "שחור",
    gold: "זהב",
    "Brightness control": "שליטה על עוצמת תאורה",
    "Intelligent defogging": "הפשרת אדים",
    "Human-body induction": "חיישן קירבה",
    "Time / Temperature display": "תצוגת זמן וטמפרטורה",
    Bluetooth: "התקן בלוטוס",
    "Three color lights": "שלושה סוגי תאורה",
  };

  let data = [
    {
      [columns["price"]]: "2,500",
      [columns["quantity"]]: values.quantity,
      [columns["technology"]]: values["technology"]
        .map((i) => dic[i])
        .join(", "),
      [columns["shape"]]: dic[values["shape"]],
      [columns["lighting"]]: dic[values["lighting"]],
      [columns["frame-color"]]: dic[values["frame-color"]],
      [columns["frame"]]: dic[values["frame"]],
      [columns["width"]]: values.width,
      [columns["height"]]: values.height,
    },
  ];

  return data;
};

const getOrderPdf = (values, hebrew, english) => {
  let orderPdf = new jsPDF({ orientation: "p" });
  const tableData = getHebrewData(values);
  // orderPdf.setR2L(true);
  const headerHeight = setHeader(orderPdf, values, hebrew, english);
  // const titleHeight = setTitle(orderPdf, values, hebrew, english, headerHeight);

  let columnStyles = {
    0: { cellWidth: 12, fillColor: [255, 255, 255] },
    1: { cellWidth: 9, fillColor: [255, 255, 255] },
    2: { cellWidth: 60, fillColor: [255, 255, 255] },
    3: { cellWidth: 15, fillColor: [255, 255, 255] },
    4: { cellWidth: 22, fillColor: [255, 255, 255] },
    5: { cellWidth: 20, fillColor: [255, 255, 255] },
    6: { cellWidth: 15, fillColor: [255, 255, 255] },
    7: { cellWidth: 15, fillColor: [255, 255, 255] },
  };
  const table = {
    ...getAutoTableData(tableData),
    didDrawPage: function (data) {
      // Top content
      // setProductTable(orderPdf, values, headerHeight, hebrew, english);
    },
    didParseCell: function (data) {
      const isHebrew = (text) => {
        return text.search(/[\u0590-\u05FF]/) >= 0;
      };
      if (isHebrew(data.cell.text[0])) {
        data.cell.text = data.cell.text[0].split("").reverse().join("");
      }
    },

    // ...rest,
    columnStyles,
    styles: {
      fontSize: 9,
      font: "Rubik",
      halign: "right",
      // cellWidth: "wrap",
      overflow: "linebreak",
      lineColor: [40],
      lineWidth: 0.3,
      cellPadding: 0.5,
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: 40,
    },
    startY: headerHeight,
    theme: "grid",
  };
  orderPdf.autoTable(table);

  let finalY = orderPdf.lastAutoTable.finalY + 10;
  const priceHeight = setPrice(orderPdf, values, hebrew, english, finalY);
  const declarationHeight = setDeclerations(
    orderPdf,
    values,
    hebrew,
    english,
    priceHeight
  );
  setSignature(orderPdf, values, hebrew, english, declarationHeight);
  // autoTable(orderPdf, table);
  // orderPdf.autoTable(table);
  // if (setBottomContent) {
  //   setBottomContent(doc, bottomContentRecord, setHeader, headerRecord, intl);
  // }
  // return doc;

  const productTableHeight = setProductTable(
    orderPdf,
    values,
    headerHeight,
    hebrew,
    english
  );

  window.open(orderPdf.output("bloburl"), "_blank");
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

export const setTitle = (doc, values, hebrew, english, height) => {
  const margins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - margins;
  const orderId = 5342543534543;
  const title = `הזמנה מספר: ${orderId.toString()}`;
  var currentHeight = height;
  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.setR2L(true);
  doc.setFont("Rubik", "normal"); // set font
  doc.text(rightMargin, currentHeight, title, "right");
  currentHeight += 5;
  return currentHeight;
};

export const setHeader = (doc, values, hebrew, english) => {
  const margins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - margins;
  var currentHeight = 20;
  const phone = values.phone ? getLocalPhoneNumber(values.phone) : null;
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
  const orderId = 5342543534543;
  const orderNumber = `הזמנה מספר: ${orderId.toString()}`;
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
  currentHeight += pdfConfig.titleLineHeight;

  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.setR2L(true);
  doc.setFont("Rubik", "normal"); // set font
  doc.text(rightMargin, currentHeight, orderNumber, "right");
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorGray);
  currentHeight += pdfConfig.subLineHeight + 2;
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
  currentHeight += pdfConfig.subLineHeight;

  return currentHeight;
};

export const setPrice = (doc, values, hebrew, english, height) => {
  const margins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - margins;

  var currentHeight = height;

  const tempSumHe = `סכום ביניים`;
  const deliveryHe = `משלוח`;
  const vatHe = `מע״מ`;
  const totalSumHe = `סה״כ לתשלום`;

  const tempSumEn = `Items sum`;
  const deliveryEn = `Delivery`;
  const vatEn = `Vat`;
  const totalSumEn = `Total sum`;
  doc.setR2L(true);
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorBlack);
  const totalPrice = new Intl.NumberFormat("he", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(values.price);

  const vatPrice = new Intl.NumberFormat("he", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format((values.price / 1.17) * 0.17);

  const deliveryPrice = new Intl.NumberFormat("he", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(0);

  const tempPrice = new Intl.NumberFormat("he", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(values.price / 1.17);
  doc.text(margins, currentHeight, tempPrice, "left");
  setEnHeItem(doc, margins + 50, currentHeight, tempSumHe, "right");
  currentHeight += 5;
  doc.text(margins, currentHeight, deliveryPrice, "left");
  setEnHeItem(doc, margins + 50, currentHeight, deliveryHe, "right");
  currentHeight += 5;
  doc.text(margins, currentHeight, vatPrice, "left");
  setEnHeItem(doc, margins + 50, currentHeight, vatHe, "right");
  currentHeight += 5;
  doc.setFont("Rubik", "bold"); // set font
  doc.text(margins, currentHeight, totalPrice, "left");
  setEnHeItem(doc, margins + 50, currentHeight, totalSumHe, "right");
  doc.setFont("Rubik", "normal"); // set font
  currentHeight += 5;
  return currentHeight;
};

export const setDeclerations = (doc, values, hebrew, english, height) => {
  const margins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - margins;
  const bottomHeight = doc.internal.pageSize.getHeight() - margins - 30;
  var currentHeight = bottomHeight;
  const declarationHe1 =
    "אני מאשר/ת בחתימתי מטה את ההזמנה המפורטת להלן, לרבות המאפיינים השונים, הכמויות והמחירים המפורטים.";
  const declarationHe2 =
    "אני מאשר/ת שההזמנה אינה מצויה במלאי החברה ותיוצר אך ורק עבורי עם מאפיינים ייחודיים שנבחרו על ידי ולכן לא ניתן לבטל את הרכישה לאחר ביצועה.";
  doc.setR2L(true);
  doc.setFontSize(pdfConfig.declerationTextSize);
  doc.setTextColor(colorGray);
  setEnHeItem(doc, rightMargin, currentHeight, declarationHe1, "right");
  currentHeight += 4;
  setEnHeItem(doc, rightMargin, currentHeight, declarationHe2, "right");
  currentHeight += 10;
  return currentHeight;
};

export const setSignature = (doc, values, hebrew, english, height) => {
  const margins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - margins;
  var currentHeight = height;
  const nameHe = "שם המזמין";
  const nameEn = "Orderer name";
  const signatureHe = "חתימה";
  const signatureEn = "Signature";
  const dateHe = "תאריך";
  const dateEn = "Date";
  const declarationHe1 =
    "אני מאשר/ת בחתימתי מטה את ההזמנה המפורטת להלן, לרבות המאפיינים השונים, הכמויות והמחירים המפורטים.";
  const declarationHe2 =
    "אני מאשר/ת שההזמנה אינה מצויה במלאי החברה ותיוצר אך ורק עבורי עם מאפיינים ייחודיים שנבחרו על ידי ולכן לא ניתן לבטל את הרכישה לאחר ביצועה.";
  doc.setR2L(true);
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorGray);
  setEnHeItem(doc, rightMargin, currentHeight, nameHe, "right");
  setEnHeItem(doc, rightMargin - 50, currentHeight, signatureHe, "right");
  setEnHeItem(doc, rightMargin - 100, currentHeight, dateHe, "right");
  currentHeight += 4;
  doc.setFont("Rubik", "bold"); // set font
  setEnHeItem(doc, rightMargin, currentHeight, values.business_name, "right");
  setEnHeItem(doc, rightMargin - 50, currentHeight, "", "right");
  // doc.line(margins, currentHeight, rightMargin, currentHeight);

  setEnHeItem(
    doc,
    rightMargin - 100,
    currentHeight,
    moment().format("MM/DD/YYYY"),
    "right"
  );

  // currentHeight += 4;
  // setEnHeItem(doc, rightMargin, currentHeight, declarationHe2, "right");
  // currentHeight += 4;
  return currentHeight;
};

export const setProductTable = (
  doc,
  values,
  initialHeight,
  hebrew,
  english
) => {
  return;
};
