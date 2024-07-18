const ExchangeRate = () => {
  const date = "2024-07-18";
  const exchangeRates = [
    { currency: "🇺🇸 USD", rate: "1,200" },
    { currency: "💶 EUR", rate: "1,350" },
    { currency: "🇯🇵 JPY", rate: "11.2" },
    { currency: "🇨🇳 CNY", rate: "170" },
    { currency: "🇬🇧 GBP", rate: "1,600" },
    { currency: "🇦🇺 AUD", rate: "850" },
  ];
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">💱 환율</h2>
        <span className="text-gray-500 text-sm cursor-pointer">{date}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {exchangeRates.map((rate, index) => (
          <div
            key={index}
            className="bg-yellow-100 rounded-md p-2 flex items-center justify-between"
          >
            <p className="text-lg font-semibold mr-2">{rate.currency}</p>
            <p className="text-lg">{rate.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRate;
