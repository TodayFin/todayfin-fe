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

  useEffect(() => {
    if (newsId) {
      const fetchNewsData = async () => {
        try {
          const response = await fetch(`/api/news/${newsId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setNewsData(data);
        } catch (error) {
          console.error("Error fetching news data:", error);
        }
      };

      fetchNewsData();
    }
  }, [newsId]);

  if (!newsData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div className="w-full md:w-2/3 pr-4">
          <NewsHeader
            title={newsData.title}
            source={newsData.source}
            publishedAt={newsData.publishedAt}
            views={newsData.views}
            content={newsData.description}
          />
          <NewsContent
            imageSrc={newsData.urlToImage}
            content={newsData.description}
          />
          <ChatRoom comments={newsData.comments} />
        </div>
        <div className="w-full md:w-1/3">
          <RecommendedNewsSidebar recommended={newsData.recommended} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
