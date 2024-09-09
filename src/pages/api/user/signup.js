export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { oauthProvider, oauthId, password, nickname, name, category } =
    req.body;

  if (
    !oauthProvider ||
    !oauthId ||
    !password ||
    !nickname ||
    !name ||
    !category
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!Array.isArray(category) || category.length !== 3) {
    return res
      .status(400)
      .json({ error: "Category must be an array with exactly 3 items" });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oauthProvider,
        oauthId,
        password,
        nickname,
        name,
        category,
      }),
    });

    if (response.ok) {
      res.status(201).json({ message: "User successfully signed up" });
    } else {
      const errorData = await response.json();
      res
        .status(response.status)
        .json({ error: errorData.message || "Failed to sign up user" });
    }
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
