"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CommunityCard from "@/components/community/CommunityCard";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

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
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/community?page=${page}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        const newPosts = data.posts.map((post) => ({
          id: post._id,
          nickname: post.nickname,
          createdAt: `${new Date(post.createdAt).toLocaleString()}`,
          title: post.title,
          content: post.content,
        }));

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">💁 커뮤니티</h1>
        <Link
          href="/community/write"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          게시글 작성
        </Link>
      </div>
      <div className="flex justify-between">
        {[0, 1, 2].map((col) => (
          <div key={col} className="flex-1 mx-2">
            {posts
              .filter((_, index) => index % 3 === col)
              .map((post) => (
                <Link href={`/community/${post.id}`} key={post.id}>
                  <CommunityCard
                    title={post.title}
                    nickname={post.nickname}
                    date={post.createdAt}
                    content={post.content}
                  />
                </Link>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
