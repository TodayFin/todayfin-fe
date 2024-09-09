const fetchCommunityPosts = async (req, res) => {
  const { page } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_BACKEND_URL;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  try {
    const response = await fetch(`${apiKey}/community?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: authorizationHeader,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch posts" });
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching community posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchCommunityPosts;
