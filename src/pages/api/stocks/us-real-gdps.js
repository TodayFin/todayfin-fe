const fetchUSRealGDPs = async (req, res) => {
  const backendUrl = process.env.ALPHA_VANTAGE_BACKEND_URL;

  const apiUrl = `${backendUrl}/real-gdps`;

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
    console.error("Error fetching GDP data:", error);
    res.status(500).json({ error: "Error fetching GDP data" });
  }
};

export default fetchUSRealGDPs;
