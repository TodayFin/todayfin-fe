"use client";
import { useState, useEffect } from "react";
import SelectCategory from "@/components/news/SelectCategory";
import SelectDay from "@/components/news/SelectDay";
import NewsThumbnailTitleContent from "@/components/news/NewsThumbnailTitleContent";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const categoryMap = {
    전체: null,
    경제: "finance",
    생명과학: "life_sciences",
    제조: "manufacturing",
    부동산: "real_estate",
    유통: "retail_wholesale",
    기술: "technology",
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const formattedDate = selectedDate.replace(/\./g, "");
        const categoryQuery = selectedCategory
          ? `?category=${selectedCategory}&page=${currentPage}&date=${formattedDate}`
          : `?page=${currentPage}&date=${formattedDate}`;

        const response = await fetch(`/api/news/date${categoryQuery}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (!response.ok) {
          throw new Error("뉴스 데이터를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setNewsData(data.news);
        setTotalPages(data.page.totalPages);
      } catch (err) {
        setError(err.message);
      }
    };

    if (selectedDate) {
      fetchNews();
    }
  }, [currentPage, selectedCategory, selectedDate]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(categoryMap[category]);
    setCurrentPage(1);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <SelectCategory onSelect={handleCategorySelect} />{" "}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <SelectDay className="mt-4" onSelect={handleDateSelect} />
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {newsData.map((news) => (
            <NewsThumbnailTitleContent
              id={news._id}
              imageSrc={news.urlToImage || "/placeholder.png"}
              title={news.title_trans || news.title}
              content={news.article_trans || news.article}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 mx-1 px-2 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
