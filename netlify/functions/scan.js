const mindee = require("mindee");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = (process.env.MINDEE_API_KEY || "").replace(/\s/g, "");
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Cle manquante" }) };
  }

  try {
    const { imageBase64, mimeType } = JSON.parse(event.body || "{}");
    if (!imageBase64) {
      return { statusCode: 400, body: JSON.stringify({ error: "Image manquante" }) };
    }

    const imageBuffer = Buffer.from(imageBase64, "base64");
    const filename = (mimeType === "application/pdf") ? "ticket.pdf" : "ticket.jpg";

    const mindeeClient = new mindee.Client({ apiKey });

    const inputSource = new mindee.BufferInput({
      buffer: imageBuffer,
      filename,
    });

    const response = await mindeeClient.enqueueAndGetResult(
      mindee.product.Extraction,
      inputSource,
      {
        modelId: "2eabe5ac-4090-4a06-a204-fc8ae7821577",
      }
    );

    const fields = response.inference.result.fields;

    // Extraire les données du ticket
    const supplier   = fields.supplier_name?.value || fields.merchant_name?.value || "Inconnu";
    const totalAmt   = fields.total_amount?.value ?? fields.total?.value ?? 0;
    const dateRaw    = fields.date?.value || null;
    const lineItems  = (fields.line_items || [])
      .map(li => li.description || li.product_code || "Article")
      .filter(Boolean)
      .slice(0, 6);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplier,
        totalAmt: parseFloat(totalAmt) || 0,
        dateRaw,
        lineItems,
        confidence: 90,
      }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
