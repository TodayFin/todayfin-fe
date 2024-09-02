import React, { useEffect, useState } from "react";
import Link from "next/link";

const RecommendedNews = ({ recommended }) => {
  const [newsDetails, setNewsDetails] = useState([]);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const fetchedDetails = await Promise.all(
          recommended.map(async (newsId) => {
            const response = await fetch(`/api/news/${newsId}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            });

            if (!response.ok) {
              throw new Error("Failed to fetch news details");
            }
            return await response.json();
          })
        );

        setNewsDetails(fetchedDetails);
      } catch (error) {
        console.error("Error fetching recommended news details:", error);
      }
    };

    fetchNewsDetails();
  }, [recommended]);

  const formatDate = (dateString) => {
    const dateParts = dateString.match(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/
    );

    if (!dateParts) {
      return "Invalid date";
    }

    const [_, year, month, day, hour, minute, second] = dateParts;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold">🌠 추천 뉴스</h2>
      <ul>
        {newsDetails.map((article, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b border-gray-200 last:border-none"
          >
            <Link
              href={`/news/${article._id}`}
              className="flex-1 hover:underline mt-2 mb-2 mr-8 truncate"
              title={article.title_trans}
            >
              {article.title_trans}
            </Link>
            <span className="flex-shrink-0 text-gray-500 text-sm">
              {formatDate(article.publishedAt)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedNews;
