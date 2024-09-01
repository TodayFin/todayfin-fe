const getCommunityPostById = async (req, res) => {
  const { postId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/community/${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch post data" });
    }

    const postData = await response.json();
    return res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching post data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getCommunityPostById;
