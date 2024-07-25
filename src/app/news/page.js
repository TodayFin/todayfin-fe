"use client";
import { useState } from "react";
import SelectCategory from "@/components/news/SelectCategory";
import SelectDay from "@/components/news/SelectDay";
import NewsThumbnailTitleContent from "@/components/news/NewsThumbnailTitleContent";

const sampleNewsData = [
  {
    imageSrc: "logo.png",
    title: "Sample News Title 1",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 2",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 3",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 4",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 5",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 6",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 7",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 8",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 9",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 10",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  ,
  {
    imageSrc: "logo.png",
    title: "Sample News Title 2",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 3",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 4",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 5",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 6",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 7",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 8",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 9",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
  {
    imageSrc: "logo.png",
    title: "Sample News Title 10",
    content:
      "하반기 IPO(기업공개) 최대어 시프트업이 유가증권시장에 상장한다. 고평가 논란 등 우려를 이겨내고 코스피 시장에 안착할지 관심이 쏠린다. 11일 금융투자업계에 따르면 시프트업은 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구",
  },
];

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = sampleNewsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handleCategorySelect = (category) => {};

  const handleDateSelect = (date) => {};

  return (
    <div className="mx-auto p-4">
      <SelectCategory onSelect={handleCategorySelect} />{" "}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <SelectDay className="mt-4" onSelect={handleDateSelect} />
        <div className="grid grid-cols-2 gap-4">
          {displayedItems.map((news, index) => (
            <NewsThumbnailTitleContent
              key={index}
              imageSrc={news.imageSrc}
              title={news.title}
              content={news.content}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({
            length: Math.ceil(sampleNewsData.length / itemsPerPage),
          }).map((_, index) => (
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
