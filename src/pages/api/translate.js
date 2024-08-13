import { translate } from "@vitalets/google-translate-api";

export default async function handler(req, res) {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res
      .status(400)
      .json({ error: "Text or target language not provided" });
  }

  try {
    const result = await translate(text, { to: targetLang });
    res.status(200).json({ translatedText: result.text });
  } catch (error) {
    console.error("Error translating text:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
}
