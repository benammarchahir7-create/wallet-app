// netlify/functions/scan.js
// Proxy sécurisé vers Mindee — la clé API reste côté serveur, jamais exposée au navigateur

const https = require("https");

exports.handler = async (event) => {
  // Seulement POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const MINDEE_API_KEY = process.env.MINDEE_API_KEY;
  if (!MINDEE_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Clé Mindee manquante — configure MINDEE_API_KEY dans Netlify" }),
    };
  }

  try {
    // L'image arrive en base64 depuis le front
    const { imageBase64, mimeType } = JSON.parse(event.body || "{}");
    if (!imageBase64 || !mimeType) {
      return { statusCode: 400, body: JSON.stringify({ error: "Image manquante" }) };
    }

    // Reconstitue le fichier binaire
    const imageBuffer = Buffer.from(imageBase64, "base64");

    // Construit le multipart/form-data à la main (pas de dépendance externe)
    const boundary = "----WalletAppBoundary" + Date.now();
    const filename  = mimeType === "application/pdf" ? "ticket.pdf" : "ticket.jpg";

    const header = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="document"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body   = Buffer.concat([header, imageBuffer, footer]);

    // Appel Mindee
    const mindeeResponse = await new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: "api.mindee.net",
          path: "/v1/products/mindee/expense_receipts/v5/predict",
          method: "POST",
          headers: {
            Authorization: `Token ${MINDEE_API_KEY}`,
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            "Content-Length": body.length,
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve({ status: res.statusCode, body: data }));
        }
      );
      req.on("error", reject);
      req.write(body);
      req.end();
    });

    if (mindeeResponse.status !== 201 && mindeeResponse.status !== 200) {
      return {
        statusCode: mindeeResponse.status,
        body: JSON.stringify({ error: "Erreur Mindee", detail: mindeeResponse.body }),
      };
    }

    // Renvoie la réponse Mindee au front
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
