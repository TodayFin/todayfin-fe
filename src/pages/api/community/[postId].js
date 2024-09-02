const handleRequest = async (req, res) => {
  const { postId } = req.query;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  switch (req.method) {
    case "GET":
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

    case "DELETE":
      try {
        const deleteResponse = await fetch(
          `${process.env.BACKEND_URL}/community/${postId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: authorizationHeader,
            },
          }
        );

        if (!deleteResponse.ok) {
          const errorData = await deleteResponse.json();
          return res
            .status(deleteResponse.status)
            .json({ error: errorData.message || "Failed to delete the post" });
        }

        return res.status(200).json({ message: "Post deleted successfully" });
      } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

    case "PUT":
      try {
        const { title, content } = req.body;

        const updateResponse = await fetch(
          `${process.env.BACKEND_URL}/community/${postId}`,
          {
            method: "PUT",
            headers: {
              Authorization: authorizationHeader,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
          }
        );

        if (!updateResponse.ok) {
          return res
            .status(updateResponse.status)
            .json({ error: "Failed to update the post" });
        }

        return res.status(204).end(); // 204 status with no content
      } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handleRequest;
