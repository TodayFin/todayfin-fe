export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { oauthId, password } = req.body;

  if (!oauthId || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oauthId,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json({ jwt: data.jwt });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
