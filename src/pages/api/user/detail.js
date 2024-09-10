export default async function handler(req, res) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header missing or invalid" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (req.method === "GET") {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/detail`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
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
  } else if (req.method === "PUT") {
    const { password, newPassword } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/detail`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, newPassword }),
        }
      );

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: "Failed to update password" });
      }

      return res.status(204).end(); // 비밀번호가 성공적으로 변경된 경우
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
