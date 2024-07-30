import { useEffect, useState } from "react";

const TodayStocks = () => {
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
        setRisingStocks(data.rising);
        setFallingStocks(data.falling);
        setDate(new Date(data.last_updated).toLocaleDateString());
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🤔 오늘의 종목</h2>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r border-gray-200 pr-4">
          <h3 className="font-semibold mb-2">🚀 급등</h3>
          <ul>
            {risingStocks.map((stock, index) => (
              <li key={index} className="flex justify-between mb-1">
                <span className="text-sm truncate mr-2">
                  {stock.rank} {stock.name}
                </span>
                <span className="text-sm text-red-500">{stock.change}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">🍂 급락</h3>
          <ul>
            {fallingStocks.map((stock, index) => (
              <li key={index} className="flex justify-between mb-1">
                <span className="text-sm truncate mr-2">
                  {stock.rank} {stock.name}
                </span>
                <span className="text-sm text-blue-500">{stock.change}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodayStocks;
