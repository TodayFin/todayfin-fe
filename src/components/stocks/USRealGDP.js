import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const USGDP = () => {
  const [gdpData, setGDPData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/stocks/us-real-gdps");
        const data = await response.json();
        setGDPData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GDP data:", error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!gdpData) {
    return <div>Error loading data</div>;
  }

  const reversedData = [...gdpData.data].reverse();

  const chartData = {
    labels: reversedData.map((entry) => new Date(entry.date).getFullYear()),
    datasets: [
      {
        label: gdpData.name,
        data: reversedData.map((entry) => parseFloat(entry.value)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "년도",
        },
      },
      y: {
        title: {
          display: true,
          text: gdpData.unit,
        },
      },
    },
  };

  const latestData = gdpData.data[0];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📈 미국 Real GDP</h2>
        <span className="text-gray-500 text-sm cursor-pointer">더보기</span>
      </div>
      <div className="mb-2">
        <Line data={chartData} options={options} />
      </div>
      <div className="flex justify-between items-center bg-green-100 p-2 rounded-md">
        <span className="text-lg font-semibold">
          {new Date(latestData.date).getFullYear()}년{" "}
          {new Date(latestData.date).getMonth() + 1}월
        </span>
        <span className="text-lg font-semibold">
          {latestData.value} 십억 달러
        </span>
      </div>
    </div>
  );
};

export default USGDP;
