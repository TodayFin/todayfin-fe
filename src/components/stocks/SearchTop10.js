"use client";
import { useState, useEffect } from "react";
const SearchTop10 = () => {
  const [stockData, setStockData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("/api/stocks");
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    };

    fetchStockData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = stockData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">📊 주식 차트</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">순위</th>
            <th className="py-2 text-left">종목</th>
            <th className="py-2 text-right">시가</th>
            <th className="py-2 text-right">당일 최고가</th>
            <th className="py-2 text-right">당일 최저가</th>
            <th className="py-2 text-right">거래량</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((stock, index) => (
            <tr key={index} className="text-center border-b border-gray-200">
              <td className="py-2">{startIndex + index + 1}</td>
              <td className="py-2 text-left">{stock.name}</td>
              <td className="py-2 font-semibold text-right">
                {stock.data[0].open}
              </td>
              <td className="py-2 text-red-500 text-right">
                {stock.data[0].high}
              </td>
              <td className="py-2 text-blue-500 text-right">
                {stock.data[0].low}
              </td>
              <td className="py-2 text-right">{stock.data[0].volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(stockData.length / itemsPerPage),
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
  );
};

export default SearchTop10;
