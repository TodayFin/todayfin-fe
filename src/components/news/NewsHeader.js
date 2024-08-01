import React, { useState } from "react";

const NewsHeader = ({ title, source, publishedAt, views }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // 기사 요약 버튼 클릭 시 요약 레이어 열기
  const handleSummaryClick = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };

  // 요약 레이어 닫기
  const closeSummary = () => {
    setIsSummaryOpen(false);
  };

  return (
    <div className="mb-4 relative">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="text-gray-500 mb-2 relative">
        <span>{source} | </span>
        <span>{new Date(publishedAt).toLocaleString()} | </span>
        <span>조회 {views}</span>
        <button
          className="m-1 px-3 py-2 rounded-lg border bg-gray-200 text-gray-700 ml-4"
          onClick={handleSummaryClick}
        >
          기사 요약
        </button>

        {isSummaryOpen && (
          <div className="absolute top-0 right-0 flex justify-between items-start bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-96">
            <p>
              {" "}
              뉴스 임시 요약 뉴스 임시 요약 뉴스 임시 요약 뉴스 임시 요약 뉴스
              임시 요약 뉴스 임시 요약 뉴스 임시 요약 뉴스 임시 요약
            </p>
            <button className="text-gray-500 ml-4" onClick={closeSummary}>
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsHeader;
