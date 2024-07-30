"use client";
import React, { useEffect, useState } from 'react';

const StockMovers = ({ title, date, stocks }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
      <div className="flex justify-between">
        {stocks.map((stock, index) => (
          <div key={index} className="w-1/5 bg-gray-50 p-4 m-2 rounded-lg text-center border">
            <h3 className="font-semibold mb-1">{stock.name}</h3>
            <p className="text-gray-700">{stock.price}</p>
            <p className={`text-sm ${parseFloat(stock.change) > 0 ? 'text-red-500' : 'text-blue-500'}`}>
              {parseFloat(stock.change) > 0 ? '+' : ''}{stock.amount}({stock.changePercentage}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TodayStockMovers = () => {
  const [risingStocks, setRisingStocks] = useState([]);
  const [fallingStocks, setFallingStocks] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/stocks/top-movers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRisingStocks(data.rising.map(stock => ({
          ...stock,
          changePercentage: parseFloat(stock.change).toFixed(2)
        })));
        setFallingStocks(data.falling.map(stock => ({
          ...stock,
          changePercentage: parseFloat(stock.change).toFixed(2)
        })));
        setDate(new Date(data.last_updated).toLocaleDateString());
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <StockMovers title="📈 오늘의 급등 종목" date={date} stocks={risingStocks} />
      <StockMovers title="📉 오늘의 급락 종목" date={date} stocks={fallingStocks} />
    </div>
  );
};

export default TodayStockMovers;