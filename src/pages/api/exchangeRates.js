const fetchExchangeRates = async (req, res) => {
  const backendUrl = process.env.ALPHA_VANTAGE_BACKEND_URL;

  const apiUrl = `${backendUrl}/exchange-rates`;

  const currencyIcons = {
    USD: "🇺🇸",
    EUR: "💶",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
    GBP: "🇬🇧",
    AUD: "🇦🇺",
  };

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const exchangeRates = data.exchange_rates.map((rateData) => ({
      icon: currencyIcons[rateData.from_currency],
      from_currency: rateData.from_currency,
      rate: parseFloat(rateData.rate).toFixed(2),
      last_refreshed: rateData.last_refreshed,
    }));

    res.status(200).json(exchangeRates);
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchExchangeRates;
