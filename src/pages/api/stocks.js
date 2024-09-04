const fetchStocks = async (req, res) => {
  const backendUrl = process.env.ALPHA_VANTAGE_BACKEND_URL;

  const apiUrl = `${backendUrl}/stocks`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.stocks) {
      res.status(200).json(data.stocks);
    } else {
      res.status(500).json({ error: "Unexpected response format from API" });
    }
  } catch (error) {
    console.error("Error fetching stock rates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchStocks;
