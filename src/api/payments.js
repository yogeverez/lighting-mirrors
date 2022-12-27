import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions();
const getapikeydetails = httpsCallable(functions, "getapikeydetails");
const getpaymenturl = httpsCallable(functions, "getpaymenturl");

class Payments {
  prox1 = "https://cors-anywhere.herokuapp.com/";
  prox2 = "https://thingproxy.freeboard.io/fetch/";
  prox3 = "";
  development = true;
  async getGreenInvoiceToken() {
    const development = false;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Access-Control-Max-Age", "1800");
    // myHeaders.append("Access-Control-Allow-Headers", "content-type");

    var raw = this.development
      ? JSON.stringify({
          id: "2d4207f7-5e34-45b1-8798-a5ff69183e2f",
          secret: "joYjc8r4Fji1WLEJv3LuVA",
        })
      : JSON.stringify({
          id: "454f75ae-0687-4a47-95b3-8982c41a7f44",
          secret: "aRkupHiflJLWVxeQ2Fu_Uw",
        });
    var url = this.development
      ? "https://sandbox.d.greeninvoice.co.il/api/v1/account/token"
      : "https://api.greeninvoice.co.il/api/v1/account/token";
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    getapikeydetails({ envirovment: "development" }).then((result) => {
      // Read result of the Cloud Function.
      /** @type {any} */
      const data = result.data;
      console.log(data);
      const sanitizedMessage = data.text;
      console.log(sanitizedMessage);
    });

    // try {
    //   var response = await fetch(this.prox3 + url, requestOptions);
    //   const result = await response.text();
    //   return result;
    // } catch (error) {
    //   console.error(error);
    // }
  }

  async launchForm(values) {
    console.log(values);
    const result = await getpaymenturl({ envirovment: "development", values });
    console.log(result);

    const data = result.data;
    const obj = JSON.parse(data);
    return obj.url;
  }

  async launchPaymentForm(values) {
    console.log(values);

    const frame = !values.frame ? "no frame" : `${values["frame-color"]} frame`;

    const itemDescription = `${values.height} mirror ${values.height}X${values.width} ${frame}`;
    const name =
      values.business_name && values.business_name !== ""
        ? values.business_name
        : `${values.first_name} ${values.surename}`;

    const res = await this.getGreenInvoiceToken();
    const obj = JSON.parse(res);
    console.log(obj.token);

    var url = this.development
      ? "https://sandbox.d.greeninvoice.co.il/api/v1/payments/form"
      : "https://api.greeninvoice.co.il/api/v1/payments/form";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer '${obj.token}'`);
    // "X-Authorization":Bearer Token '.....' // Here you can add your token
    myHeaders.append("Access-Control-Allow-Headers", "*");
    myHeaders.append("Access-Control-Request-Method", "POST");
    myHeaders.append("Origin", "http://localhost:3000");

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
      var response = await fetch(this.prox2 + url, requestOptions);
      const result = await response.text();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Payments();
