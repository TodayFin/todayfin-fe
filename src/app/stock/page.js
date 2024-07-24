import TodayStockMovers from "../../components/stocks/TodayStockMovers";
import SearchTop10 from "../../components/stocks/SearchTop10";

const StockPage = () => {
  return (
    <div className="mx-auto p-4">
      <TodayStockMovers />
      <SearchTop10 />
    </div>
  );
};

export default StockPage;