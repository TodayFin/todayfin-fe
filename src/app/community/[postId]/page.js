"use client";
import { useState, useEffect } from "react";
import ReadContent from "@/components/community/ReadContent";

const PostPage = ({ params }) => {
  const { postId } = params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/community/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();

        const formattedPost = {
          title: data.title,
          author: `User ${data.authorId}`,
          views: data.views || 0,
          date: new Date(data.createdAt),
          content: data.content,
          authorId: data.authorId,
        };

        setPost(formattedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <ReadContent
      title={post.title}
      author={post.author}
      views={post.views}
      date={post.date}
      content={post.content}
      authorId={post.authorId}
    />
  );
};

export default PostPage;
