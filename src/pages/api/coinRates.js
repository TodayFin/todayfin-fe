const fetchCoinRates = async (req = NextApiRequest, res = NextApiResponse) => {
  const backendUrl = process.env.ALPHA_VANTAGE_BACKEND_URL;

  const apiUrl = `${backendUrl}/coins`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.coins) {
      res.status(200).json(data.coins);
    } else {
      res.status(500).json({ error: "Unexpected response format from API" });
    }
  } catch (error) {
    console.error("Error fetching coin rates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchCoinRates;
