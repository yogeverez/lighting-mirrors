import fetch from "cross-fetch";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage, ref, uploadBytes } from "firebase-admin/storage";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

initializeApp(functions.config().firebase);
const storage = getStorage(functions.config().firebase);

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

const getPaymentsKey = async (envirovment) => {
  const keyRef = getFirestore().collection("secrets").doc(envirovment);
  const apiData = await keyRef.get();
  const apiToken = apiData.data();
  if (apiToken) {
    return apiToken;
  } else {
    throw new functions.https.HttpsError("internal", "could not get key");
  }
};

const getGreenInvoiceToken = async (envirovment) => {
  const apiToken = await getPaymentsKey(envirovment);
  const { id, secret } = apiToken;
  var raw = JSON.stringify({
    id,
    secret,
  });
  var url =
    envirovment === "development"
      ? "https://sandbox.d.greeninvoice.co.il/api/v1/account/token"
      : "https://api.greeninvoice.co.il/api/v1/account/token";
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  try {
    var response = await fetch(url, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getpaymenturl = functions.https.onCall(async (data, context) => {
  const res = await getGreenInvoiceToken(data.envirovment);
  const obj = JSON.parse(res);

  var url =
    data.envirovment === "development"
      ? "https://sandbox.d.greeninvoice.co.il/api/v1/payments/form"
      : "https://api.greeninvoice.co.il/api/v1/payments/form";

  const values = data.values;
  const frame = !values.frame ? "no frame" : `${values["frame-color"]} frame`;
  const itemDescription = `${values.height} mirror ${values.height}X${values.width} ${frame}`;
  const name =
    values.business_name && values.business_name !== ""
      ? values.business_name
      : `${values.first_name} ${values.surename}`;
  const orderDetails = {
    description: "מראה מוארת וחכמה בהתאמה אישית",
    type: 320,
    lang: "he",
    currency: "ILS",
    vatType: 0,
    amount: 20,
    maxPayments: 1,
    pluginId: "1a30a11e-ed83-4131-bc89-a7b82b1c826b",
    client: {
      //   id: values.id,
      name: name,
      emails: [values.email],
      taxId: values.taxId,
      address: `${values.street} ${values.house_number}`,
      city: values.city,
      zip: values.zip,
      country: "IL",
      phone: values.phone,
      add: true,
    },
    income: [
      {
        //   catalogNum: "MXDFSDD",
        description: itemDescription,
        quantity: 1,
        price: 20,
        currency: "ILS",
        vatType: 1,
      },
    ],
    remarks: "Some remarks",
    successUrl: values.successUrl,
    failureUrl: values.failureUrl,
    //   notifyUrl: "http://localhost:3000",
    custom: values.id,
  };

  var raw = JSON.stringify(orderDetails);

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer '${obj.token}'`,
    },
    body: raw,
    redirect: "follow",
  };

  try {
    var response = await fetch(url, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
});

export const getapikeydetails = functions.https.onCall(
  async (data, context) => {
    const keyRef = getFirestore().collection("secrets").doc(data.envirovment);
    const apiData = await keyRef.get();
    const apiToken = apiData.data();

    if (apiToken) {
      return apiToken;
    } else {
      throw new functions.https.HttpsError("internal", "could not get key");
    }
  }
);

export const createOrderPdf = functions.firestore
  .document("orders/{docId}")
  .onWrite(async (change, context) => {
    const orderId = context.params.docId;
    const values = change.after.data();
    values["orderId"] = orderId;
    const hebrewPdf = await getOrderPdf(values, "hebrew");
    const englishPdf = await getOrderPdf(values, "english");
    const orederNumber = orderId;
    var hebrewFile = hebrewPdf.output("blob");
    const hebrewFileName = `order-${orederNumber.toString()}-hebrew.pdf`;
    const hebrewPdfRef = ref(storage, `orders/${hebrewFileName}`);
    var englishFile = englishPdf.output("blob");
    const englishFileName = `order-${orederNumber.toString()}-english.pdf`;
    const englishPdfRef = ref(storage, `orders/${englishFileName}`);
    await uploadBytes(hebrewPdfRef, hebrewFile);
    await uploadBytes(englishPdfRef, englishFile);
  });

const getOrderPdf = async (values, language) => {
  const src =
    "https://i0.wp.com/father4justice.org/wp-content/uploads/2021/02/signature.png?ssl=1";
  const signature = await loadImage(src);

  let orderPdf = new jsPDF({ orientation: "p" });
  const tableData = getOrderTableData(values, language);
  const headerHeight = setHeader(orderPdf, values, language);
  let columnStyles =
    language === "hebrew"
      ? {
          0: { cellWidth: 12, fillColor: [255, 255, 255] },
          1: { cellWidth: 9, fillColor: [255, 255, 255] },
          2: { cellWidth: 62.5, fillColor: [255, 255, 255] },
          3: { cellWidth: 15, fillColor: [255, 255, 255] },
          4: { cellWidth: 22, fillColor: [255, 255, 255] },
          5: { cellWidth: 20, fillColor: [255, 255, 255] },
          6: { cellWidth: 15, fillColor: [255, 255, 255] },
          7: { cellWidth: 13, fillColor: [255, 255, 255] },
          8: { cellWidth: 13, fillColor: [255, 255, 255] },
        }
      : {
          8: { cellWidth: 12, fillColor: [255, 255, 255] },
          7: { cellWidth: 15, fillColor: [255, 255, 255] },
          6: { cellWidth: 57, fillColor: [255, 255, 255] },
          5: { cellWidth: 18, fillColor: [255, 255, 255] },
          4: { cellWidth: 22, fillColor: [255, 255, 255] },
          3: { cellWidth: 20, fillColor: [255, 255, 255] },
          2: { cellWidth: 15, fillColor: [255, 255, 255] },
          1: { cellWidth: 12, fillColor: [255, 255, 255] },
          0: { cellWidth: 12, fillColor: [255, 255, 255] },
        };
  const table = {
    ...getAutoTableData(tableData, language),
    didDrawPage: function (data) {
      // Top content
    },
    didParseCell: function (data) {
      const isHebrew = (text) => {
        return text.search(/[\u0590-\u05FF]/) >= 0;
      };
      if (isHebrew(data.cell.text[0])) {
        data.cell.text = data.cell.text[0].split("").reverse().join("");
      }
    },
    columnStyles,
    styles: {
      fontSize: 9,
      font: "Rubik",
      halign: language === "hebrew" ? "right" : "left",
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
  const priceHeight = setPrice(orderPdf, values, language, finalY);
  const declarationHeight = setDeclerations(
    orderPdf,
    values,
    language,
    priceHeight
  );
  setSignature(orderPdf, values, language, declarationHeight, signature);

  return orderPdf;
  // window.open(orderPdf.output("bloburl"), "_blank");
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      resolve(null);
    };
  });
};

const getPdfMargins = (doc) => {
  return 40 / doc.internal.scaleFactor;
};

const isHebrew = (text) => {
  return text.search(/[\u0590-\u05FF]/) >= 0;
};

const setEnHeItem = (doc, Hloc, vLoc, content, align) => {
  doc.setR2L(isHebrew(content));
  doc.text(Hloc, vLoc, content, align);
};

const getOrderTableData = (values, language) => {
  const hebrewColumns = {
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
  const hebrewDic = {
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

  const englishColumns = {
    frame: "Frame",
    "frame-color": "Frame color",
    height: "Height",
    width: "Width",
    lighting: "Lightning",
    quantity: "Quantity",
    shape: "Shape",
    technology: "Technology",
    price: "Price",
  };
  const englishDic = {
    withFrame: "With frame",
    noFrame: "No frame",
    straight: "Sraight",
    rounded: "Rounded",
    back: "Backlit",
    front: "Front light",
    rectangle: "Rectangle",
    round: "Round",
    elipse: "Elipse",
    black: "Black",
    gold: "Gold",
    "Brightness control": "Brightness control",
    "Intelligent defogging": "Intelligent defogging",
    "Human-body induction": "Human-body induction",
    "Time / Temperature display": "Time / Temperature display",
    Bluetooth: "Bluetooth",
    "Three color lights": "Three color lights",
  };

  const columns = language === "hebrew" ? hebrewColumns : englishColumns;
  const dic = language === "hebrew" ? hebrewDic : englishDic;

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

const getAutoTableData = (data, language) => {
  let columns = [];
  if (data[0]) {
    const items =
      language === "hebrew"
        ? Object.keys(data[0])
        : Object.keys(data[0]).reverse();
    items.forEach((key) =>
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

export const setHeader = (doc, values, language) => {
  const leftMargins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - leftMargins;
  var currentHeight = 20;
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
  const orderNumber =
    language === "hebrew"
      ? `הזמנה מספר: ${orderId.toString()}`
      : `Order number: ${orderId.toString()}`;
  const direction = language === "hebrew" ? "right" : "left";
  const headerTo = language === "hebrew" ? header.toHe : header.toEn;
  const margins = language === "hebrew" ? rightMargin : leftMargins;
  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.text(leftMargins, currentHeight, header.firmEn, "left");
  doc.setR2L(true);
  doc.setFont("Rubik", "normal"); // set font
  doc.text(rightMargin, currentHeight, header.firmHe, "right");
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorGray);
  currentHeight += 5;
  doc.setR2L(false);
  doc.text(leftMargins, currentHeight, header.addressEn, "left");
  doc.setR2L(true);
  doc.text(rightMargin, currentHeight, header.addressHe, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.setR2L(false);
  doc.text(leftMargins, currentHeight, header.phone, "left");
  doc.text(rightMargin, currentHeight, header.phone, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(leftMargins, currentHeight, header.email, "left");
  doc.text(rightMargin, currentHeight, header.email, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(leftMargins, currentHeight, header.website, "left");
  doc.text(rightMargin, currentHeight, header.website, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.line(leftMargins, currentHeight, rightMargin, currentHeight);
  currentHeight += pdfConfig.titleLineHeight;
  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.setR2L(true);
  doc.setFont("Rubik", "normal"); // set font
  setEnHeItem(doc, margins, currentHeight, orderNumber, direction);
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorGray);
  currentHeight += pdfConfig.subLineHeight + 2;
  doc.setR2L(language === "hebrew");
  doc.text(margins, currentHeight, headerTo, direction);
  currentHeight += pdfConfig.subLineHeight;
  setEnHeItem(doc, margins, currentHeight, values.business_name, direction);
  currentHeight += pdfConfig.subLineHeight;
  setEnHeItem(doc, margins, currentHeight, address, direction);
  currentHeight += pdfConfig.subLineHeight;
  setEnHeItem(doc, margins, currentHeight + 0.3, values.phone, direction);
  currentHeight += pdfConfig.subLineHeight;
  setEnHeItem(doc, margins, currentHeight, values.email, direction);
  currentHeight += pdfConfig.subLineHeight;
  return currentHeight;
};

export const setPrice = (doc, values, language, height) => {
  const leftMargins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - leftMargins;
  const labelMargins =
    language === "hebrew" ? leftMargins + 50 : rightMargin - 50;
  const contentMargins = language === "hebrew" ? leftMargins : rightMargin - 20;
  const direction = language === "hebrew" ? "right" : "left";
  var currentHeight = height;
  const tempSumHe = `סכום ביניים`;
  const deliveryHe = `משלוח`;
  const vatHe = `מע״מ`;
  const totalSumHe = `סה״כ לתשלום`;
  const tempSumEn = `Items sum`;
  const deliveryEn = `Delivery`;
  const vatEn = `Vat`;
  const totalSumEn = `Total sum`;
  const tempSum = language === "hebrew" ? tempSumHe : tempSumEn;
  const delivery = language === "hebrew" ? deliveryHe : deliveryEn;
  const vat = language === "hebrew" ? vatHe : vatEn;
  const totalSum = language === "hebrew" ? totalSumHe : totalSumEn;
  const locale = "he";
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorBlack);
  const totalPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(values.price);
  const vatPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format((values.price / 1.17) * 0.17);
  const deliveryPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(0);
  const tempPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(values.price / 1.17);
  doc.setR2L(true);
  doc.text(contentMargins, currentHeight, tempPrice, "left");
  setEnHeItem(doc, labelMargins, currentHeight, tempSum, direction);
  currentHeight += 5;
  doc.setR2L(true);
  doc.text(contentMargins, currentHeight, deliveryPrice, "left");
  setEnHeItem(doc, labelMargins, currentHeight, delivery, direction);
  currentHeight += 5;
  doc.setR2L(true);
  doc.text(contentMargins, currentHeight, vatPrice, "left");
  setEnHeItem(doc, labelMargins, currentHeight, vat, direction);
  currentHeight += 5;
  doc.setR2L(true);
  doc.setFont("Rubik", "bold"); // set font
  doc.text(contentMargins, currentHeight, totalPrice, "left");
  setEnHeItem(doc, labelMargins, currentHeight, totalSum, direction);
  doc.setFont("Rubik", "normal"); // set font
  currentHeight += 5;
  return currentHeight;
};

export const setDeclerations = (doc, values, language, height) => {
  const leftMargins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - leftMargins;
  const direction = language === "hebrew" ? "right" : "left";
  const margins = language === "hebrew" ? rightMargin : leftMargins;
  const bottomHeight = doc.internal.pageSize.getHeight() - leftMargins - 30;
  var currentHeight = bottomHeight;
  const declarationHe1 =
    "אני מאשר/ת בחתימתי מטה את ההזמנה המפורטת לעיל, לרבות המאפיינים השונים, הכמויות והמחירים המפורטים.";
  const declarationHe2 =
    "אני מאשר/ת שההזמנה אינה מצויה במלאי החברה ותיוצר אך ורק עבורי עם מאפיינים ייחודיים שנבחרו על ידי ולכן לא ניתן לבטל את הרכישה לאחר ביצועה.";
  const declerationsEn1 =
    "I confirm with my signature below the order detailed above, including the various characteristics, quantities and prices detailed.";
  const declerationsEn2 =
    "I confirm that I know that the order is not in the company's stock and will be produced exclusively for me with unique characteristics";
  const declerationsEn3 =
    "chosen by me, and therefore the purchase cannot be canceled after it has been made.";
  if (language === "hebrew") {
    doc.setR2L(true);
    doc.setFontSize(pdfConfig.declerationTextSize);
    doc.setTextColor(colorGray);
    setEnHeItem(doc, margins, currentHeight, declarationHe1, direction);
    currentHeight += 4;
    setEnHeItem(doc, margins, currentHeight, declarationHe2, direction);
    currentHeight += 10;
  } else {
    doc.setR2L(false);
    doc.setFontSize(pdfConfig.declerationTextSize);
    doc.setTextColor(colorGray);
    setEnHeItem(doc, margins, currentHeight - 4, declerationsEn1, direction);
    setEnHeItem(doc, margins, currentHeight, declerationsEn2, direction);
    currentHeight += 4;
    setEnHeItem(doc, margins, currentHeight, declerationsEn3, direction);
    currentHeight += 10;
  }
  return currentHeight;
};

export const setSignature = (doc, values, language, height, signatureImg) => {
  const leftMargins = getPdfMargins(doc);
  const rightMargin = doc.internal.pageSize.getWidth() - leftMargins;
  const direction = language === "hebrew" ? "right" : "left";
  const margins = language === "hebrew" ? rightMargin : leftMargins;
  const secondMargin =
    language === "hebrew" ? rightMargin - 50 : leftMargins + 50;
  const thirdMargin =
    language === "hebrew" ? rightMargin - 100 : leftMargins + 100;
  const lineMargin =
    language === "hebrew" ? thirdMargin + 10 : thirdMargin - 10;
  const signatureMargin =
    language === "hebrew" ? rightMargin - 90 : leftMargins + 50;
  var currentHeight = height;
  const nameHe = "שם המזמין";
  const nameEn = "Orderer name";
  const signatureHe = "חתימה";
  const signatureEn = "Signature";
  const dateHe = "תאריך";
  const dateEn = "Date";
  const name = language === "hebrew" ? nameHe : nameEn;
  const signature = language === "hebrew" ? signatureHe : signatureEn;
  const date = language === "hebrew" ? dateHe : dateEn;
  doc.setR2L(true);
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setTextColor(colorGray);
  setEnHeItem(doc, margins, currentHeight, name, direction);
  setEnHeItem(doc, secondMargin, currentHeight, signature, direction);
  setEnHeItem(doc, thirdMargin, currentHeight, date, direction);
  currentHeight += 6;
  doc.setFont("Rubik", "bold"); // set font
  setEnHeItem(doc, margins, currentHeight, values.business_name, direction);
  setEnHeItem(doc, secondMargin, currentHeight, "", direction);

  const type = signatureImg.src.substring(
    "data:image/".length,
    signatureImg.src.indexOf(";base64")
  );
  doc.line(secondMargin, currentHeight, lineMargin, currentHeight);

  doc.addImage(
    signatureImg,
    type,
    signatureMargin,
    currentHeight - 14,
    (20 / signatureImg.height) * signatureImg.width,
    20
  );
  // doc.line(margins, currentHeight, rightMargin, currentHeight);
  setEnHeItem(
    doc,
    thirdMargin,
    currentHeight,
    moment().format("DD/MM/YYYY, h:mm:ss"),
    direction
  );
  return currentHeight;
};
