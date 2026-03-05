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
    const boundary = "----FormBoundary" + Math.random().toString(36).slice(2);
    const CRLF = "\r\n";

    const part1 = Buffer.from(
      "--" + boundary + CRLF +
      `Content-Disposition: form-data; name="document"; filename="${filename}"` + CRLF +
      `Content-Type: ${mime}` + CRLF +
      CRLF
    );
    const part2 = imageBuffer;
    const part3 = Buffer.from(CRLF + "--" + boundary + "--" + CRLF);
    const bodyBuf = Buffer.concat([part1, part2, part3]);

    const result = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: "api.mindee.net",
        path: "/v1/products/mindee/expense_receipts/v5/predict",
        method: "POST",
        headers: {
          "Authorization": `Token ${key}`,
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
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

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: result.body,
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
