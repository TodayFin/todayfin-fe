const fetchTopMovers = async (req, res) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const apiUrl = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const roundToThirdDecimal = (value) => {
      return (Math.round(value * 1000) / 1000).toFixed(3);
    };

    const processedRisingStocks = data.top_gainers
      .slice(0, 5)
      .map((stock, index) => ({
        rank: index + 1,
        name: stock.ticker,
        change: `${roundToThirdDecimal(
          parseFloat(stock.change_percentage.replace("%", ""))
        )}%`,
      }));

    const processedFallingStocks = data.top_losers
      .slice(0, 5)
      .map((stock, index) => ({
        rank: index + 1,
        name: stock.ticker,
        change: `${roundToThirdDecimal(
          parseFloat(stock.change_percentage.replace("%", ""))
        )}%`,
      }));

    const lastUpdatedDate = data.last_updated.split(" ")[0];

    res.status(200).json({
      last_updated: lastUpdatedDate,
      rising: processedRisingStocks,
      falling: processedFallingStocks,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
};

export default fetchTopMovers;
