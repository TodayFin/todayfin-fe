"use client";
import { useState, useEffect } from "react";

const CoinList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortedData, setSortedData] = useState(data);
  const [sortKey, setSortKey] = useState("rate");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = parseFloat(a[sortKey]);
      const bValue = parseFloat(b[sortKey]);

      if (sortOrder === "asc") {
        return aValue - bValue; // 오름차순
      } else {
        return bValue - aValue; // 내림차순
      }
    });
    setSortedData(sorted);
  }, [sortKey, sortOrder, data]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">🪙 암호화폐</h2>
        <div>
          <label htmlFor="sort" className="mr-2">
            정렬:
          </label>
          <select
            id="sort"
            value={`${sortKey}-${sortOrder}`}
            onChange={handleSortChange}
          >
            <option value="rate-desc">시가 내림차순</option>
            <option value="rate-asc">시가 오름차순</option>
            <option value="bid-desc">매수 호가 내림차순</option>
            <option value="bid-asc">매수 호가 오름차순</option>
            <option value="ask-desc">매도 호가 내림차순</option>
            <option value="ask-asc">매도 호가 오름차순</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">번호</th>
            <th className="py-2 text-left">종목</th>
            <th className="py-2 text-right">시가</th>
            <th className="py-2 text-right">매수 호가</th>
            <th className="py-2 text-right">매도 호가</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item, index) => (
            <tr key={index} className="text-center border-b border-gray-200">
              <td className="py-2">{index + 1}</td>
              <td className="py-2 text-left">{item.name}</td>
              <td className="py-2 text-right">
                {parseFloat(item.rate).toFixed(2)}
              </td>
              <td className="py-2 text-right text-red-500">
                {parseFloat(item.bid).toFixed(2)}
              </td>
              <td className="py-2 text-right text-blue-500">
                {parseFloat(item.ask).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (_, index) => (
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
          )
        )}
      </div>
    </div>
  );
};

export default CoinList;
