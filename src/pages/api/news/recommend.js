const fetchRecommendations = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    console.log(id);
    const response = await fetch(`${process.env.RECOMMEND_AI_URL}/recommend/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    const data = await response.json();
    const { recommend } = data;

    return res.status(200).json({ recommend });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchRecommendations;
