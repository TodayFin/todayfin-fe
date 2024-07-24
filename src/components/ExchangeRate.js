import { useEffect, useState } from "react";

const ExchangeRate = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/exchangeRates");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setExchangeRates(data);
        if (data.length > 0) {
          setDate(data[0].last_refreshed.split(" ")[0]);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    getData();
  }, []);

  if (exchangeRates.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">💱 환율</h2>
        <span className="text-gray-500 text-sm cursor-pointer">{date}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {exchangeRates.map((rate, index) => (
          <div
            key={index}
            className="bg-yellow-100 rounded-md p-2 flex items-center justify-between"
          >
            <p className="text-lg font-semibold mr-2">
              {rate.icon} {rate.from_currency}
            </p>
            <p className="text-lg">{rate.rate}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center mt-4">
        <span className="text-gray-500 text-sm cursor-pointer">단위: 원화(KRW)</span>
      </div>
    </div>
  );
};

export default ExchangeRate;
