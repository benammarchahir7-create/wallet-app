// netlify/functions/scan.js
const https = require("https");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const MINDEE_API_KEY = process.env.MINDEE_API_KEY;
  if (!MINDEE_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Cle Mindee manquante" }),
    };
  }

  try {
    const { imageBase64, mimeType } = JSON.parse(event.body || "{}");
    if (!imageBase64 || !mimeType) {
      return { statusCode: 400, body: JSON.stringify({ error: "Image manquante" }) };
    }

    const imageBuffer = Buffer.from(imageBase64, "base64");
    const boundary = "WalletBoundary" + Date.now();
    const filename = mimeType === "application/pdf" ? "ticket.pdf" : "ticket.jpg";

    const CRLF = "\r\n";
    const header = Buffer.from(
      "--" + boundary + CRLF +
      'Content-Disposition: form-data; name="document"; filename="' + filename + '"' + CRLF +
      "Content-Type: " + mimeType + CRLF +
      CRLF
    );
    const footer = Buffer.from(CRLF + "--" + boundary + "--" + CRLF);
    const body = Buffer.concat([header, imageBuffer, footer]);

    const mindeeResponse = await new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: "api.mindee.net",
          path: "/v1/products/mindee/expense_receipts/v5/predict",
          method: "POST",
          headers: {
            "Authorization": "Token " + MINDEE_API_KEY.trim(),
            "Content-Type": "multipart/form-data; boundary=" + boundary,
            "Content-Length": body.length,
          },
        },
        (res) => {
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => resolve({
            status: res.statusCode,
            body: Buffer.concat(chunks).toString("utf8"),
          }));
        }
      );
      req.on("error", reject);
      req.write(body);
      req.end();
    });

    if (mindeeResponse.status !== 201 && mindeeResponse.status !== 200) {
      return {
        statusCode: mindeeResponse.status,
        body: JSON.stringify({
          error: "Erreur Mindee " + mindeeResponse.status,
          detail: mindeeResponse.body,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: mindeeResponse.body,
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
