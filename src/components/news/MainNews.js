"use client";
import { useEffect, useState } from "react";
import NewsThumbnailTitle from "./NewsThumbnailTitle";
import NewsThumbnailTitleContent from "./NewsThumbnailTitleContent";

const MainNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async (date) => {
      try {
        const formattedDate = date
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");

        const response = await fetch(
          `/api/news/date?page=1&date=${formattedDate}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }

        const data = await response.json();
        return data.news;
      } catch (error) {
        console.error("Error fetching news:", error);
        return [];
      }
    };

    const loadNews = async () => {
      let currentDate = new Date();
      let news = [];
      const maxAttempts = 30;
      let attempts = 0;

      while (news.length === 0 && attempts < maxAttempts) {
        news = await fetchLatestNews(currentDate);
        if (news.length === 0) {
          currentDate.setDate(currentDate.getDate() - 1);
          attempts++;
        }
      }

      setNewsData(news);
      setIsLoading(false);
    };

    loadNews();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📰 최신 뉴스</h2>
        <span className="text-gray-500 text-sm cursor-pointer">더보기</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {newsData.length > 0 && (
          <NewsThumbnailTitleContent
            key={newsData[0]._id}
            id={newsData[0]._id}
            imageSrc={newsData[0].urlToImage || "/placeholder.png"}
            title={newsData[0].title_trans || newsData[0].title}
            content={newsData[0].article_trans || newsData[0].article}
          />
        )}
        {newsData.length > 1 && (
          <NewsThumbnailTitleContent
            key={newsData[1]._id}
            id={newsData[1]._id}
            imageSrc={newsData[1].urlToImage || "/placeholder.png"}
            title={newsData[1].title_trans || newsData[1].title}
            content={newsData[1].article_trans || newsData[1].article}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsData.slice(2, 5).map((news) => (
            <NewsThumbnailTitle
              key={news._id}
              id={news._id}
              imageSrc={news.urlToImage || "/placeholder.png"}
              title={news.title_trans || news.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
