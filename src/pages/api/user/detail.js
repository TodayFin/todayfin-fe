export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header missing or invalid" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/detail`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log()
      return res
        .status(response.status)
        .json({ error: errorData.message || "Failed to fetch user details" });
    }

    const userData = await response.json();
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
