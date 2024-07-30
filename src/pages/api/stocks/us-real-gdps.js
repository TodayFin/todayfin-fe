const fetchUSRealGDPs = async (req, res) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const apiUrl = `https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const processedData = {
      name: data.name,
      interval: data.interval,
      unit: data.unit,
      data: data.data.map((entry) => ({
        date: entry.date,
        value: entry.value,
      })),
    };

    res.status(200).json(processedData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching GDP data" });
  }
};

export default fetchUSRealGDPs;
