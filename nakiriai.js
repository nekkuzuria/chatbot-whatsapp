const { Client, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (msg) => {
  if (!msg.isGroup && msg.from == "your_number@c.us") {
    const postData = {
      apikey: "your_api_key",
      text: msg.body,
    };

    axios
      .post("https://api.velixs.com/nakiri", postData)
      .then((response) => {
        const reply = response.data.data.reply;
        console.log("Response:", reply);

        client.sendMessage(msg.from, reply);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

client.initialize();
