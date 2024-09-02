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

  const renderPagination = () => {
    const maxPagesToShow = 10;
    const startPage =
      Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`w-8 h-8 mx-1 px-2 py-1 rounded ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {startPage > 1 && (
          <button
            className="w-8 h-8 mx-1 px-2 py-1 rounded bg-gray-200"
            onClick={() => handlePageChange(startPage - 1)}
          >
            &lt;
          </button>
        )}
        {pages}
        {endPage < totalPages && (
          <button
            className="w-8 h-8 mx-1 px-2 py-1 rounded bg-gray-200"
            onClick={() => handlePageChange(endPage + 1)}
          >
            &gt;
          </button>
        )}
      </>
    );
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
              key={news._id}
              id={news._id}
              imageSrc={news.urlToImage || "/placeholder.png"}
              title={news.title_trans || news.title}
              content={news.article_trans || news.article}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">{renderPagination()}</div>
      </div>
    </div>
  );
};

export default NewsPage;
