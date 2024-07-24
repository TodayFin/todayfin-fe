"use client";

import MainNews from "../components/news/MainNews";
import RecommendedNews from "../components/news/RecommendedNews";
import TodayStocks from "../components/stocks/TodayStocks";
import USGDP from "../components/stocks/USRealGDP";
import ExchangeRate from "../components/ExchangeRate";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 메인 */}
        <div className="col-span-2">
          <div className="mb-4">
            <MainNews />
          </div>
          <div>
            <RecommendedNews />
          </div>
        </div>

        {/* 사이드바 */}
        <div className="col-span-1">
          <div className="mb-4">
            <TodayStocks />
          </div>
          <div className="mb-4">
            <USGDP />
          </div>
          <div>
            <ExchangeRate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
