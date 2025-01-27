"use client";
import { useState, useEffect } from "react";
import ReadContent from "@/components/community/ReadContent";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const PostPage = ({ params }) => {
  const { postId } = params;
  const [post, setPost] = useState(null);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const restoreAuth = useAuthStore((state) => state.restoreAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await restoreAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [restoreAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
          author: data.nickname,
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

  if (!post) return <Spinner />;

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
