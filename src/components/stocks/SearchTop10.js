"use client";
import { useState, useEffect } from "react";
const SearchTop10 = () => {
  const top10Data = [
    {
      rank: 1,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 2,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 3,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 4,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 5,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 6,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 7,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 8,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 9,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
    {
      rank: 10,
      name: "KODEX 200선물인버스-2X",
      price: "1,754",
      dailyHigh: "123",
      dailyLow: "123",
      volume: "123",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = top10Data.slice(startIndex, startIndex + itemsPerPage);
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
              <td className="py-2">{stock.rank}</td>
              <td className="py-2 text-left">{stock.name}</td>
              <td className="py-2 font-semibold text-right">{stock.price}</td>
              <td className="py-2 text-red-500 text-right">
                {stock.dailyHigh}
              </td>
              <td className="py-2 text-blue-500 text-right">
                {stock.dailyLow}
              </td>
              <td className="py-2 text-right">{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(top10Data.length / itemsPerPage),
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
