const fetchNews = async (req, res) => {
  const { category } = req.query;
  const { page = 1 } = req.query;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }

  let endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/news/date?page=${page}`;

  if (category) {
    endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/news/date/${category}?page=${page}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchNews;
