import React, { useState } from "react";

const NewsHeader = ({ title, source, publishedAt, views, content }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summary, setSummary] = useState("뉴스 요약을 불러오는 중...");
  const [isLoading, setIsLoading] = useState(false);

  // 기사 요약 버튼 클릭 시 요약 레이어 열기
  const handleSummaryClick = async () => {
    setIsSummaryOpen(!isSummaryOpen);

    if (!isSummaryOpen) {
      setIsLoading(true);

      try {
        const response = await fetch("/api/news/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch summary" + response);
        }

        const data = await response.json();

        const translateResponse = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: data.summary, targetLang: "ko" }),
        });

        const translateData = await translateResponse.json();
        setSummary(translateData.translatedText);
      } catch (error) {
        setSummary("요약을 불러오지 못했습니다. 다시 시도해주세요." + error);
      } finally {
        setIsLoading(false);
      }
    }
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
          <div className="absolute top-0 right-0 flex justify-between items-start bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-sm">
            <p>{isLoading ? "요약을 불러오는 중..." : summary}</p>
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
