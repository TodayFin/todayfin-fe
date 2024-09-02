import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RecommendedNewsSidebar = ({ recommended }) => {
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

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">추천 뉴스</h2>
      {newsDetails.map((news, index) => (
        <div key={index} className="mb-4 flex">
          <Link href={`/news/${news._id}`}>
            <div className="flex">
              <Image
                src={news.urlToImage || "/placeholder.png"}
                alt={news.title}
                className="w-32 h-32 object-cover rounded-lg mr-4"
                width={32}
                height={32}
              />
              <div>
                <h3 className="text-md font-bold mb-1">
                  {news.title_trans || news.title}
                </h3>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendedNewsSidebar;
