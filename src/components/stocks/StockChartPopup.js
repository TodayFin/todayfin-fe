import React from "react";
import { Line } from "react-chartjs-2";

const StockChartPopup = ({ name, data, onClose }) => {
  const chartData = {
    labels: data.map((entry) => entry.date.slice(5)),
    datasets: [
      {
        data: data.map((entry) => entry.close),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StockChartPopup;
