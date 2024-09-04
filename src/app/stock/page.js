import TodayStockMovers from "../../components/stocks/TodayStockMovers";
import StockList from "../../components/stocks/StockList";

const StockPage = () => {
  return (
    <div className="container mx-auto p-4">
      <TodayStockMovers />
      <StockList />
    </div>
  );
};

export default StockPage;
