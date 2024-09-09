const fetchNewsDetail = async (req, res) => {
  const { newsId } = req.query;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${newsId}`, {
      method: "GET",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch news detail");
    }

    const newsData = await response.json();

    return res.status(200).json(newsData);
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchNewsDetail;
