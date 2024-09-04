"use client";
import { useState, useEffect } from "react";
import ReadContent from "@/components/community/ReadContent";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const PostPage = ({ params }) => {
  const { postId } = params;
  const [post, setPost] = useState(null);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const restoreAuth = useAuthStore((state) => state.restoreAuth);

  useEffect(() => {
    restoreAuth();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [isAuthenticated, restoreAuth, router]);
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
      _id={postId}
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
