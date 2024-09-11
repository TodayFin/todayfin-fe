import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const StockChartPopup = ({ name, data, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const chartData = {
    series: [
      {
        data: data.map((entry) => ({
          x: new Date(entry.date).getTime(),
          y: [entry.open, entry.high, entry.low, entry.close].map(parseFloat),
        })),
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: name,
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <button className="text-gray-500" onClick={onClose}>
            Close
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="candlestick"
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default StockChartPopup;
