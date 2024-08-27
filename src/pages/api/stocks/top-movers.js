const fetchTopMovers = async (req, res) => {
  const backendUrl = process.env.ALPHA_VANTAGE_BACKEND_URL;

  const apiUrl = `${backendUrl}/top-gainers-losers`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const roundToThirdDecimal = (value) => {
      return (Math.round(value * 1000) / 1000).toFixed(3);
    };

    const processedRisingStocks = data.top_gainers.slice(0, 5).map((stock) => ({
      rank: stock.rank,
      name: stock.name,
      price: roundToThirdDecimal(parseFloat(stock.price)),
      amount: roundToThirdDecimal(parseFloat(stock.amount)),
      change: stock.change,
    }));

    const processedFallingStocks = data.top_losers.slice(0, 5).map((stock) => ({
      rank: stock.rank,
      name: stock.name,
      price: roundToThirdDecimal(parseFloat(stock.price)),
      amount: roundToThirdDecimal(parseFloat(stock.amount)),
      change: stock.change,
    }));

    const lastUpdatedDate = new Date().toISOString().split("T")[0]; // Using current date as last_updated

    res.status(200).json({
      last_updated: lastUpdatedDate,
      rising: processedRisingStocks,
      falling: processedFallingStocks,
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Error fetching stock data" });
  }
};

export default fetchTopMovers;
