import { HuggingFace } from "huggingface";

const API_KEY = process.env.HUGGINGFACE_API_KEY;

const huggingface = new HuggingFace(API_KEY);

export default async function handler(req, res) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "No content provided" });
  }

  try {
    const response = await huggingface.summarization({
      model: "kdk07718/t5-small-finetuned-cnn-news",
      inputs: content,
      parameters: {
        max_length: 150,
        min_length: 40,
        length_penalty: 2.0,
        num_beams: 4,
        early_stopping: true,
      },
    });

    const summary = response?.summary_text || "No summary available.";

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
}
