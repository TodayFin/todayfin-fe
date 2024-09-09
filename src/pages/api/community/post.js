export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, content } = req.body;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/community/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.status === 204) {
      return res.status(204).end();
    } else {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({
          error: errorData.message || "Failed to post community content",
        });
    }
  } catch (error) {
    console.error("Error posting community content:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
