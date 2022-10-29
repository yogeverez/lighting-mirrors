class Payments {
  prox1 = "https://cors-anywhere.herokuapp.com/";
  prox2 = "https://thingproxy.freeboard.io/fetch/";
  development = false;
  async getGreenInvoiceToken() {
    const development = false;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = development
      ? JSON.stringify({
          id: "c9785d21-d438-4518-a6d7-885d563c3433",
          secret: "kMPNbbr-mKmSatqscxtcKA",
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

    try {
      var response = await fetch(this.prox2 + url, requestOptions);
      const result = await response.text();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async launchPaymentForm() {
    // const res = await this.getGreenInvoiceToken();
    // const obj = JSON.parse(res);
    // console.log(obj.token);
    const tok =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.VUZndHRzQzN6Ym4vVG1YL2JFWEVjUkFDMXpyMkx3U3VNN1o5Qm9EV0tMZUxWc3g2MHFTQVlEUEM4RUJLUjV0Nlk4ZDkrZW14ZVN3Ymp0QW8xbGMrOHNleUZjVWZibnk5aU1pQnNMMkRCcHR6RnZRZlpFZytWTWd2RFEyL3hobEhuUDh2VC9FYXZvWWVvWmdYUVpPVmZtbEFOeHM0eGYxbitiSjdUdzl0SHgySThjQmMwZVRTV2wwbDR1ZXRud0hKQ1MyRitEMnJoaTBxNnN0bXVpdUZMOUVzWlhwMHJuYUNEc21GRnNac25JWjRJYkt5ZitKZGxPRlpOM3dIUEZFTll6OU9kSHdQTUZiM1A2dUJtcDNwNm5RNGQrRXRVSXkxcTZOM1Rtekk4MUkwdWcrcndMZnljNGt3dUtZVlUzSnRjNnV2Mm9neTlFbjhZM3pFaS83UGR3PT0.4FlbFSYqq1O-UwaRapKokJJ_3JTrPekrN_9hHVGqxSA";
    var url = this.development
      ? "https://sandbox.d.greeninvoice.co.il/api/v1/payments/form"
      : "https://api.greeninvoice.co.il/api/v1/payments/form";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer '${tok}'`);
    // "X-Authorization":Bearer Token '.....' // Here you can add your token
    myHeaders.append("Access-Control-Allow-Headers", "*");
    myHeaders.append("Access-Control-Request-Method", "POST");
    myHeaders.append("Origin", "http://localhost:3000");

    var raw = JSON.stringify({
      description: "תיאור מסמך",
      type: 320,
      lang: "he",
      currency: "ILS",
      vatType: 0,
      amount: 20,
      maxPayments: 1,
      //   pluginId: "7944827a-c664-11e4-8231-080027271115",
      client: {
        // id: "7944827a-c664-11e4-8231-080027271114",
        name: "name",
        emails: ["email1@example.com", "email2@example.com"],
        taxId: "0123456789",
        address: "1 Luria st",
        city: "Tel Aviv",
        zip: "1234567",
        country: "IL",
        phone: "+972-54-1234567",
        fax: "+972-54-1234567",
        mobile: "+972-54-1234567",
        add: true,
      },
      income: [
        {
          //   catalogNum: "MXDFSDD",
          //   description: "Item description",
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
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(this.prox2 + url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
}

export default new Payments();
