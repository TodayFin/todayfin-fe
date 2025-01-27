"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewsHeader from "@/components/news/NewsHeader";
import NewsContent from "@/components/news/NewsContent";
import RecommendedNewsSidebar from "@/components/news/RecommendedNewsSidebar";
import useAuthStore from "@/store/authStore";
import ChatRoom from "@/components/news/chat/ChatRoom";

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const NewsPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const newsId = pathname.split("/").pop();

  const [newsData, setNewsData] = useState(null);
  const [recommendedNews, setRecommendedNews] = useState([]);
  const userId = useAuthStore((state) => state.user?.id);
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
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (newsId && userId) {
      const fetchNewsData = async () => {
        try {
          const response = await fetch(`/api/news/${newsId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setNewsData(data);

          const recommendResponse = await fetch(`/api/news/recommend`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          });

          if (!recommendResponse.ok) {
            throw new Error("Failed to fetch recommended news");
          }

          const recommendData = await recommendResponse.json();
          setRecommendedNews(recommendData.recommend);
        } catch (error) {
          console.error("Error fetching news data:", error);
        }
      };

      fetchNewsData();
    }
  }, [newsId, userId]);

  if (!newsData) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div className="w-full md:w-2/3 pr-4">
          <NewsHeader
            title={newsData.title_trans}
            source={newsData.source}
            publishedAt={newsData.publishedAt}
            /*views={newsData.views}*/
            content={newsData.article}
          />
          <NewsContent
            imageSrc={newsData.urlToImage || "/placeholder.png"}
            content={newsData.article_trans}
            url={newsData.url}
          />
          <ChatRoom newsId={newsId} />{" "}
        </div>
        <div className="w-full md:w-1/3">
          <RecommendedNewsSidebar recommended={recommendedNews} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
