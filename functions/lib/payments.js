// import * as admin from "firebase-admin";
// import * as functions from "firebase-functions";

const functionsV2 = require("firebase-functions/v2");
// import * as functions from "firebase-functions";
const { onCall } = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
let admin = require("firebase-admin");

const getPaymentsKey = async (envirovment) => {
  const keyRef = admin.firestore().collection("secrets").doc(data.envirovment);
  const data = await keyRef.get();
  const apiToken = apiCategory.data();
  return apiToken;
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
    headers: myHeaders,
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

export const getPaymentFormUrl = onCall(async (data, context) => {
  const res = await getGreenInvoiceToken(data.envirovment);
  const obj = JSON.parse(res);
  console.log(obj.token);

  var url =
    data.envirovment === "development"
      ? "https://sandbox.d.greeninvoice.co.il/api/v1/payments/form"
      : "https://api.greeninvoice.co.il/api/v1/payments/form";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer '${obj.token}'`);
  const values = data.values;

  const itemDescription = `${values.height} mirror ${values.height}X${values.width} ${frame}`;
  const name =
    values.business_name && values.business_name !== ""
      ? values.business_name
      : `${values.first_name} ${values.surename}`;
  const orderDetails = {
    description: "טופז תשלום",
    type: 320,
    lang: "he",
    currency: "ILS",
    vatType: 0,
    amount: 20,
    maxPayments: 1,
    pluginId: "1a30a11e-ed83-4131-bc89-a7b82b1c826b",
    client: {
      // id: "7944827a-c664-11e4-8231-080027271114",
      name: name,
      emails: [values.email],
      taxId: values.taxId,
      address: `${values.street} ${values.house_number}`,
      city: values.city,
      zip: values.zip,
      country: "IL",
      phone: values.phone,
      // fax: "+972-54-1234567",
      // mobile: "+972-54-1234567",
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
    //   successUrl: "http://localhost:3000/",
    //   failureUrl: "http://localhost:3000/",
    //   notifyUrl: "http://localhost:3000",
    custom: "some custom data comes here",
  };

  var raw = JSON.stringify(orderDetails);
  console.log(orderDetails);

  var requestOptions = {
    method: "POST",
    //   mode: "no-cors",
    headers: myHeaders,
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

export const getApiKey = onCall(async (data, context) => {
  const keyRef = admin.firestore().collection("secrets").doc(data.envirovment);

  const data = await keyRef.get();
  const apiToken = apiCategory.data();

  if (apiToken) {
    return apiToken;
  } else {
    throw new functionsV2.https.HttpsError("internal", "could not get key");
  }
});
