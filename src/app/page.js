"use client";
import { useEffect, useState } from "react";

import MainNews from "../components/news/MainNews";
import RecommendedNews from "../components/news/RecommendedNews";
import TodayStocks from "../components/stocks/TodayStocks";
import USGDP from "../components/stocks/USRealGDP";
import ExchangeRate from "../components/ExchangeRate";

const Home = () => {
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
    if (userId) {
      const fetchNewsData = async () => {
        try {
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
  }, userId);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 메인 */}
        <div className="col-span-2">
          <div className="mb-4">
            <MainNews />
          </div>
          <div>
            <RecommendedNews recommended={recommendedNews} />
          </div>
        </div>

        {/* 사이드바 */}
        <div className="col-span-1">
          <div className="mb-4">
            <TodayStocks />
          </div>
          <div className="mb-4">
            <USGDP />
          </div>
          <div>
            <ExchangeRate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
