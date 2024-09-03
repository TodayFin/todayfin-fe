"use client";
import { useState, useEffect } from "react";

const StockList = () => {
  const [stockData, setStockData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("open");
  const [sortOrder, setSortOrder] = useState("desc");

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

  useEffect(() => {
    const sortStockData = () => {
      const sorted = [...stockData].sort((a, b) => {
        const aValue = parseFloat(a.data[0][sortKey]);
        const bValue = parseFloat(b.data[0][sortKey]);

        if (sortOrder === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });

      setSortedData(sorted);
    };

    if (stockData.length > 0) {
      sortStockData();
    }
  }, [sortKey, sortOrder, stockData]);

  const handleSortChange = (e) => {
    const [key, order] = e.target.value.split("-");
    setSortKey(key);
    setSortOrder(order);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = sortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">📊 주식 차트</h2>
        <div>
          <label htmlFor="sort" className="mr-2">
            정렬:
          </label>
          <select
            id="sort"
            value={`${sortKey}-${sortOrder}`}
            onChange={handleSortChange}
          >
            <option value="open-desc">시가 내림차순</option>
            <option value="open-asc">시가 오름차순</option>
            <option value="high-desc">당일 최고가 내림차순</option>
            <option value="high-asc">당일 최고가 오름차순</option>
            <option value="low-desc">당일 최저가 내림차순</option>
            <option value="low-asc">당일 최저가 오름차순</option>
            <option value="volume-desc">거래량 내림차순</option>
            <option value="volume-asc">거래량 오름차순</option>
          </select>
        </div>
      </div>
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
                {stock.data[0]?.open.slice(0, 6)}
              </td>
              <td className="py-2 text-red-500 text-right">
                {stock.data[0]?.high.slice(0, 6)}
              </td>
              <td className="py-2 text-blue-500 text-right">
                {stock.data[0]?.low.slice(0, 6)}
              </td>
              <td className="py-2 text-right">{stock.data[0]?.volume}</td>
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

export default StockList;
