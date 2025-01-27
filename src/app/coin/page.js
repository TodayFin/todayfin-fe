"use client";
import React, { useState, useEffect } from "react";
import CoinList from "@/components/coin/CoinList";

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const CoinPage = () => {
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinRates = async () => {
      try {
        const response = await fetch("/api/coinRates");
        if (!response.ok) {
          throw new Error("Failed to fetch coin data");
        }
        const data = await response.json();
        const formattedData = data.map((item, index) => ({
          rank: index + 1,
          name: item.name,
          rate: item.rate,
          bid: item.bid,
          ask: item.ask,
        }));
        setCoinData(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCoinRates();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <CoinList data={coinData} />
    </div>
  );
};

export default CoinPage;
