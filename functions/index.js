import fetch from "cross-fetch";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp(functions.config().firebase);

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
    description: "טופז תשלום",
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
