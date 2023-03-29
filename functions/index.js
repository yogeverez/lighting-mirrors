import fetch from "cross-fetch";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";
import { defineSecret } from "firebase-functions/params";

const firebaseServiceAccount = defineSecret("firebase_service_account");

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
    functions.logger.log(response);

    const result = await response.text();
    functions.logger.log(result);

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
  const items = values.items;
  const shipmentDetails = values.shipmentDetails;
  const getFrame = (i) => {
    return !i.frame ? "no frame" : `${i["frameColor"]} frame`;
  };
  const name =
    shipmentDetails.businessName && shipmentDetails.businessName !== ""
      ? shipmentDetails.businessName
      : `${shipmentDetails.firstName} ${shipmentDetails.lastName}`;
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
      emails: [shipmentDetails.email],
      taxId: shipmentDetails.taxId,
      address: `${shipmentDetails.street} ${shipmentDetails.houseNumber}`,
      city: shipmentDetails.city,
      zip: shipmentDetails.zip,
      country: "IL",
      phone: shipmentDetails.phone,
      add: true,
    },
    income: items.map((i) => {
      return {
        description: `${i.height} mirror ${i.height}X${i.width} ${getFrame(i)}`,
        quantity: 1,
        price: 20,
        currency: "ILS",
        vatType: 1,
      };
    }),
    remarks: "Some remarks",
    successUrl: values.successUrl,
    failureUrl: values.failureUrl,
    //   notifyUrl: "http://localhost:3000",
    custom: values.id,
  };
  var raw = JSON.stringify(orderDetails);

  const token = obj.token;
  functions.logger.log(token);

  const authorization = `Bearer ${token}`;
  functions.logger.log(authorization);

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: raw,
    // redirect: "follow",
  };
  functions.logger.log(requestOptions);

  try {
    var response = await fetch(url, requestOptions);
    functions.logger.log(response);

    const result = await response.text();
    functions.logger.log(result);

    return result;
  } catch (error) {
    console.error(error);
    functions.logger.log(error);
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

export const sendOrderPdf = functions
  .runWith({ secrets: [firebaseServiceAccount] })
  .storage.object()
  .onFinalize(async (object) => {
    const filePath = object.name; // File path in the bucket.
    const url = await generateSignedUrl(firebaseServiceAccount, filePath);
    const agentMailsRef = getFirestore()
      .collection("config")
      .doc("agent_mails");
    const agentData = await agentMailsRef.get();
    const ccMailsRef = getFirestore().collection("config").doc("cc");
    const ccData = await ccMailsRef.get();
    const toMails = agentData.data().mails;
    const ccMails = ccData.data().mails;
    const metadata = object.metadata;
    const name = `${metadata.firstName} ${metadata.lastName}`;
    const mail = metadata.email;
    const phone = metadata.phone;
    const message = `${name} שלום רב, מצורפת ההזמנה שנחתמה על ידך.`;
    const keyRef = getFirestore().collection("mails");
    const newMail = {
      name,
      mail,
      phone,
      content: message,
      to: filePath.includes("english") ? toMails : mail,
      cc: ccMails,
      message: {
        subject: filePath.includes("english")
          ? "New order from watchmarks"
          : `הזמנת מראה חתומה`,
        text: `${message}`,
        attachments: [
          {
            // use URL as an attachment
            filename: "order.pdf",
            path: url,
          },
        ],
      },
    };
    await keyRef.add(newMail);
  });

async function generateSignedUrl(firebaseServiceAccount, fileName) {
  const storage = new Storage({
    projectId: JSON.parse(process.env.FIREBASE_CONFIG).projectId,
    credentials: JSON.parse(firebaseServiceAccount.value()), // (or just a raw JS object)
  });
  const options = {
    version: "v2", // defaults to 'v2' if missing.
    action: "read",
    expires: Date.now() + 1000 * 60 * 60 * 10000, // one hour * 100000
  };
  // Get a v2 signed URL for the file
  const [url] = await storage
    .bucket("lighting-mirrors-dev.appspot.com")
    .file(fileName)
    .getSignedUrl(options);
  return url;
}
