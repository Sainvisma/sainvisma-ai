export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product, theme, orientation } = req.body;

  const aiPrompt = `
Buat prompt foto produk profesional untuk keperluan iklan.

Produk:
${product}

Tema visual:
${theme || "studio minimalis"}

Orientasi:
${orientation}

Gaya:
- fotografi komersial
- pencahayaan studio realistis
- detail tajam
- latar bersih
- kualitas iklan premium
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: aiPrompt }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.choices[0].message.content
  });
}
