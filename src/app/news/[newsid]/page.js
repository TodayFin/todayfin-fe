"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NewsHeader from "@/components/news/NewsHeader";
import NewsContent from "@/components/news/NewsContent";
import RecommendedNewsSidebar from "@/components/news/RecommendedNewsSidebar";
import ChatRoom from "@/components/news/chat/ChatRoom";

const NewsPage = () => {
  const pathname = usePathname();
  const newsId = pathname.split("/").pop();

  const [newsData, setNewsData] = useState(null);
  const [recommendedNews, setRecommendedNews] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`/api/user/detail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserId(data._id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

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

  if (!newsData) return <div>Loading...</div>;

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
          {/*<ChatRoom comments={newsData.comments} />*/}
        </div>
        <div className="w-full md:w-1/3">
          <RecommendedNewsSidebar recommended={recommendedNews} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
