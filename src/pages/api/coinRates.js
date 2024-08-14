import { NextApiRequest, NextApiResponse } from "next";

const fetchCoinRates = async (req = NextApiRequest, res = NextApiResponse) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const currencies = [
    "BTC",
    "ETH",
    "BNB",
    "XRP",
    "ADA",
    "SOL",
    "DOT",
    "DOGE",
    "LINK",
    "LTC",
    "AAVE",
    "UNI",
    "BCH",
    "XLM",
    "ATOM",
    "XMR",
    "AVAX",
    "TRX",
  ];
  const toCurrency = "KRW";

  try {
    const promises = currencies.map((currency) =>
      fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currency}&to_currency=${toCurrency}&apikey=${apiKey}`
      ).then((response) => response.json())
    );

    const results = await Promise.all(promises);

    const coinRates = results.map((result) => {
      const coinRateData = result["Realtime Currency Exchange Rate"];
      if (coinRateData) {
        return {
          name: coinRateData["2. From_Currency Name"],
          rate: parseFloat(coinRateData["5. Exchange Rate"]).toFixed(2),
          last_refreshed: coinRateData["6. Last Refreshed"],
          bid: parseFloat(coinRateData["8. Bid Price"]).toFixed(2),
          ask: parseFloat(coinRateData["9. Ask Price"]).toFixed(2),
        };
      } else {
        return {
          name: "API limit exceeded",
          rate: "-1",
          last_refreshed: "N/A",
          bid: "-1",
          ask: "-1",
        };
      }
    });

    res.status(200).json(coinRates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching exchange rates" });
  }
};

export default fetchCoinRates;
