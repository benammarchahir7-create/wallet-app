const https = require("https");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const key = (process.env.MINDEE_API_KEY || "").replace(/\s/g, "");
  if (!key) {
    return { statusCode: 500, body: JSON.stringify({ error: "Cle manquante" }) };
  }

  try {
    const { imageBase64, mimeType } = JSON.parse(event.body || "{}");
    if (!imageBase64) {
      return { statusCode: 400, body: JSON.stringify({ error: "Image manquante" }) };
    }

    const imageBuffer = Buffer.from(imageBase64, "base64");
    const mime = mimeType || "image/jpeg";
    const filename = mime === "application/pdf" ? "ticket.pdf" : "ticket.jpg";
    const boundary = "----WalletBoundary" + Date.now();
    const CRLF = "\r\n";

    const part1 = Buffer.from(
      "--" + boundary + CRLF +
      `Content-Disposition: form-data; name="document"; filename="${filename}"` + CRLF +
      `Content-Type: ${mime}` + CRLF + CRLF
    );
    const part3 = Buffer.from(CRLF + "--" + boundary + "--" + CRLF);
    const bodyBuf = Buffer.concat([part1, imageBuffer, part3]);

    const result = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: "api.mindee.net",
        path: "/v2/predict/2eabe5ac-4090-4a06-a204-fc8ae7821577",
        method: "POST",
        headers: {
          "Authorization": "Token " + key,
          "Content-Type": "multipart/form-data; boundary=" + boundary,
          "Content-Length": bodyBuf.length,
        },
      }, (res) => {
        let raw = "";
        res.on("data", d => raw += d);
        res.on("end", () => resolve({ status: res.statusCode, body: raw }));
      });
      req.on("error", reject);
      req.write(bodyBuf);
      req.end();
    });

    if (result.status !== 200 && result.status !== 201) {
      return {
        statusCode: result.status,
        body: JSON.stringify({ error: `Erreur Mindee ${result.status}`, detail: result.body }),
      };
    }

    // Parser la reponse v2
    const data = JSON.parse(result.body);
    const fields = data?.inference?.result?.fields || {};

    const supplier  = fields.supplier_name?.value || fields.merchant_name?.value || "Inconnu";
    const totalAmt  = fields.total_amount?.value ?? fields.total?.value ?? 0;
    const dateRaw   = fields.date?.value || null;
    const lineItems = (fields.line_items || [])
      .map(li => li.description || li.product_code || "Article")
      .filter(Boolean).slice(0, 6);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supplier, totalAmt: parseFloat(totalAmt) || 0, dateRaw, lineItems, confidence: 90 }),
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
